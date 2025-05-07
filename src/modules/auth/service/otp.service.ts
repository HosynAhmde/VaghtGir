import { ConfigNamespace } from '@Common/configuration/config.constant';
import { RedisService } from '@Common/modules/redis';


import { generateCacheKey, Hash } from '@Common/utils';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotAcceptableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { digity } from 'digity';
import { OTP_CACHE_KEY } from '../constants';
import { isDev, isStaging } from '@Common/utils/node.util';
import { SmsService } from '@Common/modules/sms';

@Injectable()
export class OtpService {
  private readonly logger = new Logger(OtpService.name);
  private readonly otpTTL: number; // Duration in seconds
  private readonly otpLength: number; // number of digits
  private readonly maxOtpResendAttempts: number;
  private readonly otpResendWindow: number;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly smsService: SmsService,
  ) {
    const { TTL, length, maxResendAttempts, resendWindow } = this.configService.get(ConfigNamespace.Otp);
    this.otpTTL = TTL;
    this.otpLength = length;
    this.maxOtpResendAttempts = maxResendAttempts;
    this.otpResendWindow = resendWindow;
  }

  async send(mobile: string) {
    await this.checkOtpNotAlreadySent(mobile);
    await this.checkResendAttempts(mobile);

    const otp = this.generate();
    const hashedOtp = await Hash.hash(otp);

    try {
      await this.storeOtp(mobile, hashedOtp);
      await this.incrementResendAttempts(mobile);

      // In development/staging, log the OTP instead of sending SMS
      if (isDev || isStaging) {
        this.logger.debug(`OTP for ${mobile}: ${otp}`);
        return { ttl: this.otpTTL };
      }

      await this.smsService.sendCode(mobile, otp, { ttl: this.otpTTL });
      return { ttl: this.otpTTL };
    } catch (error) {
      this.logger.error(`Failed to send OTP to ${mobile}`, error.stack);
      throw new NotAcceptableException('otp.send_error');
    }
  }

  async validate(mobile: string, otp: string) {
    if (isDev) {
      const otpLength = this.otpLength.toString();
      const validOtp: Record<string, string> = {
        '4': '1111',
        '5': '11111',
      };

      if (validOtp[otpLength] === otp) {
        return true;
      }
    }

    const hashedOtp = await this.getStoredOtp(mobile);
    if (!hashedOtp) {
      throw new BadRequestException('otp.expired');
    }

    const isValid = await this.isOtpValid(otp, hashedOtp);
    if (isValid) {
      // Clear OTP after successful validation
      await this.clearOtp(mobile);
    }
    return isValid;
  }

  private generate(): string {
    return digity(this.otpLength).toString();
  }

  private async checkOtpNotAlreadySent(mobile: string): Promise<void> {
    const otp = await this.getStoredOtp(mobile);
    if (otp) {
      const currentTTL = await this.redisService.ttl(
        generateCacheKey(OTP_CACHE_KEY, mobile),
      );
      throw new HttpException(
        { message: 'otp.already_sent', ttl: currentTTL },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  private async checkResendAttempts(mobile: string): Promise<void> {
    const attempts = await this.getResendAttempts(mobile);
    if (attempts >= this.maxOtpResendAttempts) {
      throw new HttpException(
        { message: 'otp.max_resend_attempts_reached' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
  }

  private async getResendAttempts(mobile: string): Promise<number> {
    const key = this.getResendAttemptKey(mobile);
    const attempts = await this.redisService.get(key);
    return attempts ? parseInt(attempts) : 0;
  }

  private async incrementResendAttempts(mobile: string): Promise<void> {
    const key = this.getResendAttemptKey(mobile);
    await this.redisService.incr(key);
    await this.redisService.expire(key, this.otpResendWindow);
  }

  private getResendAttemptKey(mobile: string): string {
    return `otp_resend:${mobile}`;
  }

  private async storeOtp(mobile: string, hashedOtp: string): Promise<void> {
    await this.redisService.set(
      generateCacheKey(OTP_CACHE_KEY, mobile),
      hashedOtp,
      'EX',
      this.otpTTL,
    );
  }

  private async clearOtp(mobile: string): Promise<void> {
    await this.redisService.del(generateCacheKey(OTP_CACHE_KEY, mobile));
  }

  private async getStoredOtp(mobile: string): Promise<string | null> {
    return this.redisService.get(generateCacheKey(OTP_CACHE_KEY, mobile));
  }

  private async isOtpValid(otp: string, hashedOtp: string): Promise<boolean> {
    return Hash.compare(otp, hashedOtp);
  }
}

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
  private readonly otpTTL: number; // Duration in seconds
  private readonly otpLength: number; // number of digits

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
    private readonly smsService: SmsService,
  ) {
    const { TTL, length } = this.configService.get(ConfigNamespace.Otp);
    this.otpTTL = TTL;
    this.otpLength = length;
  }

  async send(mobile: string) {
    await this.checkOtpNotAlreadySent(mobile);
    const otp = this.generate();

    try {
      await this.storeOtp(mobile, otp);

      await this.smsService.sendCode(mobile, otp,{ttl: +this.otpTTL});
      return { ttl: +this.otpTTL };
    } catch (error) {
      console.log(error);
      
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
    if (!hashedOtp) throw new BadRequestException('otp.expired');

    return this.isOtpValid(otp, hashedOtp);
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

  private async storeOtp(mobile: string, otp: string): Promise<void> {
    const hashedOtp = await Hash.hash(otp);
    await this.redisService.set(
      generateCacheKey(OTP_CACHE_KEY, mobile),
      hashedOtp,
      'EX',
      this.otpTTL,
    );
  }

  private async getStoredOtp(mobile: string): Promise<string | null> {
    return this.redisService.get(generateCacheKey(OTP_CACHE_KEY, mobile));
  }

  private async isOtpValid(otp: string, hashedOtp: string): Promise<boolean> {
    return Hash.compare(otp, hashedOtp);
  }
}

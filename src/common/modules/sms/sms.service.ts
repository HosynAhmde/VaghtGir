import { isProd } from '@Common/utils/node.util';
import { Inject, Injectable, Logger } from '@nestjs/common';

import { PROVIDER_TOKEN } from './constants';
import { SmsProvider } from './interface/sms.provider.interface';
import { RahyabProvider } from './providers/rahyab.provider';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly smsProvider: SmsProvider;

  constructor(
    @Inject(PROVIDER_TOKEN) smsProvider: SmsProvider,
    private readonly rahyab: RahyabProvider,
  ) {
    this.smsProvider = smsProvider;
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    if (!isProd)
      return this.logger.log(
        `OTP "${otp}" for ${phoneNumber} not sent - not in production environment.`,
      );

    try {
      await this.rahyab.sendOtp(phoneNumber, otp);
    } catch (error) {
      this.logger.error(`Otp Not Send: [${phoneNumber}] - ${error} `);
    }
  }
}

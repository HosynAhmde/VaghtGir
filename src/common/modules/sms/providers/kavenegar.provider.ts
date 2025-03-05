import { ConfigNamespace } from '@Common/configuration/config.constant';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { SmsProvider } from '../interface/sms.provider.interface';

@Injectable()
export class KavenegarProvider implements SmsProvider {
  private logger = new Logger(this.constructor.name);
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly apiVersion: string;
  private readonly otpTemplate: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const {
      kavenegar: { baseUrl, apiKey, apiVersion, otpTemplate },
    } = this.configService.get(ConfigNamespace.Sms);

    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.apiVersion = apiVersion;
    this.otpTemplate = otpTemplate;
  }

  async sendOtp(phone: string, otp: any): Promise<void> {
    const url = `${this.baseUrl}/${this.apiVersion}/${this.apiKey}/verify/lookup.json`;
    const params = {
      receptor: phone,
      token: otp,
      template: this.otpTemplate,
    };

    try {
      await this.httpService.axiosRef.get(url, { params });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

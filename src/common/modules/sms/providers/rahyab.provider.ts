import { ConfigNamespace } from '@Common/configuration/config.constant';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TemplateDelegate } from 'handlebars';
import hbs from 'handlebars';
import { Client } from 'nestjs-soap';

import { RAHYAB_SOAP_CLIENT } from '../constants';
import type { SmsProvider } from '../interface';

interface RahyabOpt {
  username: string;
  password: string;
  number: string;
  template: string;
  uFarsi: boolean;
  uTopic: boolean;
  uUDH: boolean;
}

@Injectable()
export class RahyabProvider implements SmsProvider {
  private readonly logger = new Logger(RahyabProvider.name);
  private readonly uMessage: TemplateDelegate;
  private readonly rahyabOption: RahyabOpt;

  constructor(
    private readonly configService: ConfigService,
    @Inject(RAHYAB_SOAP_CLIENT) readonly client: Client,
  ) {
    const { rahyab } = this.configService.get(ConfigNamespace.Sms);

    this.rahyabOption = rahyab.args as RahyabOpt;

    this.uMessage = hbs.compile(this.rahyabOption.template);
  }

  async sendOtp(phone: string, otp: string): Promise<void> {
    this.logger.log(phone, otp);

    const args = {
      uUsername: this.rahyabOption.username,
      uPassword: this.rahyabOption.password,
      uNumber: this.rahyabOption.number,
      uMessage: this.uMessage({ otp }),
      uTopic: this.rahyabOption.uTopic,
      uUDH: this.rahyabOption.uUDH,
      uFlash: this.rahyabOption.uFarsi,
      uCellphones: phone,
    };

    try {
      await this.client.doSendSMS(args, (err, result) => {});
    } catch (error) {
      this.logger.error(`SMS NOT SENT - ${error}`);
    }
  }
}

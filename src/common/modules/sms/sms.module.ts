import { ConfigNamespace } from '@Common/configuration/config.constant';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { SoapModuleOptionsFactoryType } from 'nestjs-soap';
import { SoapModule } from 'nestjs-soap';

import { PROVIDER_TOKEN, RAHYAB_SOAP_CLIENT } from './constants';
import { providers } from './providers';
import { SmsProviders } from './providers.constant';
import { KavenegarProvider } from './providers/kavenegar.provider';
import { RahyabProvider } from './providers/rahyab.provider';
import { SmsService } from './sms.service';

const SmsProvider = {
  provide: PROVIDER_TOKEN,
  useFactory: (configService: ConfigService) => {
    const providerKey = configService.get(ConfigNamespace.Sms)
      .provider as SmsProviders;

    const provider = providerKey
      ? providers[providerKey]
      : providers[SmsProviders.Rahyab];

    return provider;
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    HttpModule.register({ timeout: 5000 }),
    SoapModule.forRootAsync({
      clientName: RAHYAB_SOAP_CLIENT,
      inject: [ConfigService],
      useFactory: (
        configService: ConfigService,
      ): SoapModuleOptionsFactoryType => {
        const { rahyab } = configService.get(ConfigNamespace.Sms);
        return {
          uri: rahyab.uri,
        };
      },
    }),
  ],
  providers: [SmsProvider, SmsService, KavenegarProvider, RahyabProvider],
  exports: [SmsService],
})
export class SmsModule {}

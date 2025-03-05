import { ConfigNamespace } from '@Common/configuration/config.constant';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';

import { HttpFilter } from './http.filter';

@Module({
  imports: [
    SentryModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get(ConfigNamespace.Sentry),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useValue: new SentryInterceptor(),
    },
  ],
})
export class ErrorsModule {}

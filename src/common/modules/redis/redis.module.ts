import { ConfigNamespace } from '@Common/configuration/config.constant';
import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { REDIS_KEY_OPTIONS, RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static registerAsync(): DynamicModule {
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: REDIS_KEY_OPTIONS,
          useFactory: (configService: ConfigService) =>
            configService.get(ConfigNamespace.Redis),
          inject: [ConfigService],
        },
        RedisService,
      ],
      exports: [RedisService],
      global: true,
    };
  }
}

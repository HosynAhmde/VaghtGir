import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configs } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      cache: true,
      load: [...configs],
    }),
  ],
})
export class ConfigurationModule {}

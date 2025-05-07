import { ConfigurationModule } from '@Common/configuration';
import { RequestModule } from '@Common/modules';
import { BlacklistedModule } from '@Common/modules/blacklisted';
import { DatabaseModule } from '@Common/modules/database';
import { ErrorsModule } from '@Common/modules/errors';
import { MiddlewareModule } from '@Common/modules/middleware';
import { RedisModule } from '@Common/modules/redis';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SmsModule } from '@Common/modules/sms';
import { Modules } from '@Modules/modules.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    JwtModule.register({ global: true }),
    MiddlewareModule,
    ConfigurationModule,
    RedisModule.registerAsync(),
    BlacklistedModule,
    ErrorsModule,
    RequestModule,
    DatabaseModule,
    HttpModule,
    SmsModule,
    Modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

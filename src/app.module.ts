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
import { UserModule } from '@Modules/user/user.module';
import { AuthModule } from '@Modules/auth';
import { SmsModule } from '@Common/modules/sms';



@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),
    MiddlewareModule,
    ConfigurationModule,
    RedisModule.registerAsync(),
    BlacklistedModule,
    ErrorsModule,
    RequestModule,
    DatabaseModule,
    HttpModule,
    SmsModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

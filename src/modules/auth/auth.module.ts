
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService, OtpService, SessionService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsModule } from '@Common/modules/sms';
import { SessionEntity } from './entity';
import { SessionRepository } from './session.repository';


@Module({
  imports: [
    TypeOrmModule.forFeature([SessionEntity]),
    JwtModule,
    UserModule,
    SmsModule,
  ],
  providers: [AuthService, SessionService, SessionRepository,OtpService],
  controllers: [AuthController],
})
export class AuthModule {}

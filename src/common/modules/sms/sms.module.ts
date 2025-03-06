import { Module } from '@nestjs/common';

import { SmsService } from './sms.service';
import { KavenegarService, MeliPayamakService } from './providers';

@Module({
  providers: [SmsService, MeliPayamakService, KavenegarService],
  exports: [SmsService],
})
export class SmsModule {}

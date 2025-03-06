import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from '../redis';
import { OTP_CODE_PREFIX_KEY } from './constants';
import { OtpProvider } from './enums';
import { KavenegarService, MeliPayamakService } from './providers';
import type { OtpConfig } from './types';
import { KaveResponse } from './interface';
import { isProd } from '@Common/utils/node.util';


@Injectable()
export class SmsService {
  constructor(
    private readonly redisService: RedisService,
    private readonly meliPayamakService: MeliPayamakService,
    private readonly kavenegarService: KavenegarService,
  ) {}

  public async sendCode(
    mobile: string,
    code: string,
    options: {
      ttl: number;
      provider?: OtpProvider;
      config?: OtpConfig;
      template?: string;
    },
  ): Promise<{response: KaveResponse[] }> {
    if (await this.redisService.get(`${OTP_CODE_PREFIX_KEY}:${mobile}`)) {
      const currTtl = await this.redisService.ttl(
        `${OTP_CODE_PREFIX_KEY}:${mobile}`,
      );
      throw new HttpException(
        { message: 'OTP.TOO_MANY_REQUEST_GIVEN', ttl: currTtl },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
 //////TODOOOOO
    options.config = options.config ;
    options.template = options.template ; 
    options.provider = options.provider ?? OtpProvider.Kavenegar;

    // eslint-disable-next-line fp/no-let
    let SmsResponse: { status: number; response: KaveResponse[] };

    if (isProd) {
      // this.logger.trace({ title: '[OTP] Start Sending OTP', mobile });
      SmsResponse = await KavenegarService.send(
        this.kavenegarService.getClient(options.config),
        { phone: mobile, code },
        { template: options.template },
      );
      // this.logger.trace({ title: '[OTP] OTP Sent', SmsResponse });
    }

    // this.logger.info(`OTP: ${code} fro mobile: ${mobile}`);

  

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return { response: SmsResponse?.response };
  }

  
}

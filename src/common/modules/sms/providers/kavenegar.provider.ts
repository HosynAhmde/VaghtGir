import { Injectable } from '@nestjs/common';
import type { kavenegar as Provider } from 'kavenegar';
import { KavenegarApi } from 'kavenegar';
import { PinoLogger } from 'nestjs-pino';

import type { OtpPayload } from '../types';
import { KaveResponse } from '../interface';

export interface KavenegarSendOptions {
  template: string;
}

const log = new PinoLogger({ renameContext: 'KavenegarService' });

@Injectable()
export class KavenegarService {
  getClient(options: Provider.Options): Provider.KavenegarInstance {
    return KavenegarApi(options);
  }

  static send(
    client: Provider.KavenegarInstance,
    payload: OtpPayload,
    options?: KavenegarSendOptions,
  ): Promise<{ status: number; response: KaveResponse[] }> {
    return new Promise((resolve, _reject) => {
      client.VerifyLookup(
        {
          receptor: payload.phone,
          token: payload.code,
          template: options?.template,
        },
        (response, status, message) => {
          log.debug({ response, status, message });
          log.trace('kavenegar worked successfully');
          resolve({ status, response });
        },
      );
    });
  }
}

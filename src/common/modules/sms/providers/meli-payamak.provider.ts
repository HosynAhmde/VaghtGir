import { Injectable } from '@nestjs/common';
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { PinoLogger } from 'nestjs-pino';

import type { ClientOption, OtpPayload } from '../types';
import type { SendOtpOptions } from '../types/send-options.type';

const logger = new PinoLogger({ renameContext: 'MeliPayamakService' });
@Injectable()
export class MeliPayamakService {
  getClient(options: ClientOption): AxiosInstance {
    const {
      apikey,
      domain = `https://console.melipayamak.com/api/send/shared/`,
    } = options;
    return axios.create({ baseURL: domain + apikey });
  }

  static send(
    client: AxiosInstance,
    payload: OtpPayload,
    options?: SendOtpOptions,
  ) {
    client
      .post('', {
        bodyId: parseInt(options?.template),
        to: payload.phone,
        args: [payload.code],
      })
      .catch(() => {
        logger.error(
          `MeliPayamak failed to send message - phone: ${payload.phone}`,
        );
      });
  }
}

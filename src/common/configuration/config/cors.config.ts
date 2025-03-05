import { RequestMethods } from '@Common/modules';
import { getNodeEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

const origins = {
  staging: [
    'https://staging.vaghtgir.ir',
    'https://crm.staging.vaghtgir.ir',
    'https://my.staging.vaghtgir.ir',
    ],
  production: [
    'https://vaghtgir.ir',
  ],
  development: ['http://localhost:5173'],
};

export default registerAs(ConfigNamespace.Cors, () => ({
  allowOrigin: origins[getNodeEnv()],

  allowMethods: [
    RequestMethods.GET,
    RequestMethods.POST,
    RequestMethods.PUT,
    RequestMethods.PATCH,
    RequestMethods.DELETE,
  ],
  allowHeaders: [
    'Accept',
    'Accept-Language',
    'Content-Language',
    'Content-Type',
    'Origin',
    'Authorization',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials',
    'Access-Control-Expose-Headers',
    'Access-Control-Max-Age',
    'Referer',
    'Host',
    'X-Requested-With',
    'x-timestamp',
    'x-timezone',
    'x-request-id',
    'x-version',
    'x-repo-version',
    'X-Response-Time',
    'user-agent',
  ],
}));

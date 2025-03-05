import { RequestMethods } from '@Common/modules/request';

import { isProd } from './node.config';

export const MIDDLEWARE_CONFIG = () => ({
  cors: {
    allowOrigin: isProd
      ? ['https://horseava.ir', 'https://my.horseava.ir']
      : [
          'https://my.staging.horseava.ir',
          'https://staging.horseava.ir',
          'http://localhost:8080',
          'https://api.staging.horseava.ir/docs',
        ],
    allowMethod: [
      RequestMethods.GET,
      RequestMethods.DELETE,
      RequestMethods.PUT,
      RequestMethods.PATCH,
      RequestMethods.POST,
    ],
    allowHeader: [
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
  },
});

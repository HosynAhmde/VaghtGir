import { getEnv, getRequiredEnv } from '@Common/utils';
import { isProd, isStaging } from '@Common/utils/node.util';
import { registerAs } from '@nestjs/config';
import type { JwtSignOptions } from '@nestjs/jwt';
import type { CookieOptions } from 'express';
import ms from 'ms';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Auth, () => ({
  accessToken: {
    secret: getRequiredEnv('ACCESS_TOKEN_SECRET'),
    expiresIn: getEnv('ACCESS_TOKEN_EXPIRATION', '1d'),
  } as JwtSignOptions,
  refreshToken: {
    secret: getRequiredEnv('REFRESH_TOKEN_SECRET'),
    expiresIn: getEnv('REFRESH_TOKEN_EXPIRATION', '30d'),
  } as JwtSignOptions,

  cookie: {
    name: 'refresh_token',

    cookieOptions: {
      httpOnly: isProd || isStaging,
      secure: isProd || isStaging,
      //TODO: other versions should be added in future
      path: '/v1/auth',
      maxAge: ms(getEnv('REFRESH_TOKEN_EXPIRATION', '30d')),
      sameSite: 'strict',
    } as CookieOptions,
  },
}));

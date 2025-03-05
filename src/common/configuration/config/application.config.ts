import { getEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Application, () => ({
  host: getEnv('HOST', 'localhost'),
  port: parseInt(getEnv('PORT', '8000'), 10),
  tz: getEnv('TZ', 'Asia/Tehran'),

  version: getEnv('APP_VERSION', '1.0.0'),
}));

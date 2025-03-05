import { getEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Redis, () => ({
  password: getEnv('REDIS_PASSWORD'),
  host: getEnv('REDIS_HOST', 'localhost'),
  port: parseInt(getEnv('REDIS_PORT', '6379'), 10),
}));

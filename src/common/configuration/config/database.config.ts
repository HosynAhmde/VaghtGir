import { getEnv, getRequiredEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';


export default registerAs(ConfigNamespace.Database, () => ({
  type: 'postgres',
  host: getRequiredEnv('DB_HOST'),
  port: parseInt(getEnv('DB_PORT', '5432'), 10),
  database: getRequiredEnv('DB_NAME'),
  username: getRequiredEnv('DB_USERNAME'),
  password: getRequiredEnv('DB_PASSWORD'),
}));

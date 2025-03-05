import { getBooleanEnv, getEnv, getNodeEnv, is } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Sentry, () => ({
  debug: getBooleanEnv('SENTRY_DEBUG', true),

  dsn: getEnv('SENTRY_DSN'),
  environment: getNodeEnv(),
  logLevel: ['debug', 'error', 'warn'],
  enabled: is('staging') || is('production'),
  tracesSampleRate: 1.0,
}));

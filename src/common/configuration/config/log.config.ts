import { getEnv } from '@Common/utils';

export enum LogLevel {
  Trace = 'trace',
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Fatal = 'fatal',
}

export const LOGGER_CONFIG = () => ({
  level: getEnv('PINO_LOG_LEVEL', LogLevel.Info),
});

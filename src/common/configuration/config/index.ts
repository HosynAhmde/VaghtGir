import applicationConfig from './application.config';
import authConfig from './auth.config';
import corsConfig from './cors.config';
import databaseConfig from './database.config';
import minioConfig from './minio.config';
import otpConfig from './otp.config';
import redisConfig from './redis.config';
import smsConfig from './sms.config';
import paymentConfig from './payment.config';
import sentryConfig from './sentry.config';
export const configs = [
  applicationConfig,
  authConfig,
  paymentConfig,
  redisConfig,
  sentryConfig,
  corsConfig,
  smsConfig,
  otpConfig,
  databaseConfig,
  minioConfig,
];

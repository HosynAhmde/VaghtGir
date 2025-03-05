import { getBooleanEnv, getEnv, getRequiredEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Sms, () => ({
  provider: getEnv('SMS_PROVIDER', 'rahyab'),

  kavenegar: {
    apiKey: getEnv('SMS_KAVENEGAR_API_KEY'),
    baseUrl: 'https://api.kavenegar.com',
    apiVersion: getEnv('SMS_KAVENEGAR_API_VERSION', 'v1'),
    otpTemplate: getEnv('SMS_KAVENEGAR_OTP_TEMPLATE'),
  },
  rahyab: {
    args: {
      username: getRequiredEnv('SMS_RAHYAB_TOKEN'),
      password: getEnv('SMS_RAHYAB_TEXT', 'random_string'),

      number: getRequiredEnv('SMS_RAHYAB_NUMBER'),
      template: getRequiredEnv('SMS_RAHYAB_TEMPLATE'),

      uFarsi: getBooleanEnv('SMS_RAHYAB_FARSI', true),
      uTopic: getBooleanEnv('SMS_RAHYAB_TOPIC', false),
      uUDH: getEnv('SMS_RAHYAB_UDH', ''),
    },

    uri: getEnv('SMS_RAHYAB_URI'),
  },
}));

import { getEnv, getRequiredEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Otp, () => ({
  TTL: getEnv('OTP_TTL') ?? 120, // second

  length: parseInt(getRequiredEnv('OTP_LENGTH'), 10),
}));

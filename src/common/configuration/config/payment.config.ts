import { getEnv, getRequiredEnv } from '@Common/utils';
import { registerAs } from '@nestjs/config';

import { ConfigNamespace } from '../config.constant';

export default registerAs(ConfigNamespace.Payment, () => ({
  sep: {
    TerminalId: parseInt(getRequiredEnv('PAYMENT_SEP_TERMINALID'), 10),
    TerminalPassword: getRequiredEnv('PAYMENT_SEP_PASSWORD'),
    CallBackUrl: getRequiredEnv('PAYMENT_SEP_CALL_BACK_URL'),
  },
  PAYMENT_START_POINT_ID: 10_000,
  /**
   * AMOUNT IN TOOMAN
   */
  MINIMUM_CHARGE_WALLET_AMOUNT: 1_500_000,
}));

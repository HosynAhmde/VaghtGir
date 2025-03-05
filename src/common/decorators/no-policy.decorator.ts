import { SetMetadata } from '@nestjs/common';

import { NO_POLICY_REQUIRED_KEY } from '../constants';

/**
 * ignore policy guard but apply access token
 */
export const NoPolicyRequired = () => SetMetadata(NO_POLICY_REQUIRED_KEY, true);

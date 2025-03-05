import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC_KEY } from '../constants';

/**
 * ignore access token validation and policy guard
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

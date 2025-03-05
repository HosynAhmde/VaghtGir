import type { Action } from '@Common/constants';
import { CHECK_POLICY_KEY } from '@Common/constants';
import { SetMetadata } from '@nestjs/common';

export const SetPolicy = (action: Action) =>
  SetMetadata(CHECK_POLICY_KEY, action);

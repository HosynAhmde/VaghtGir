import { SetMetadata } from '@nestjs/common';

import type { Action, Resource } from '../constants';
import { RESOURCE_ACTION_KEY } from '../constants';

export const ResourceAction = (resource: Resource, action: Action) =>
  SetMetadata(RESOURCE_ACTION_KEY, { resource, action });

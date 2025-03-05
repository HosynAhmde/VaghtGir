import type { Resource } from '@Common/constants';
import { RESOURCE_KEY } from '@Common/constants';
import { SetMetadata } from '@nestjs/common';

export const SetResource = (resource: Resource) =>
  SetMetadata(RESOURCE_KEY, resource);

import { IS_PUBLIC_KEY } from '@Common/constants';
import { SetMetadata } from '@nestjs/common';

export const IsPublic = (isTokenRequired = true) =>
  SetMetadata(IS_PUBLIC_KEY, isTokenRequired);

import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import type { AppRequest } from '../modules/request';

export interface TWhereQuery {
  AND?: Array<{
    OR: Array<{
      own?: { id: string };
      shares?: { id: string };
    }>;
  }>;
}

export const WhereQuery = createParamDecorator(
  (_data, ctx: ExecutionContext): TWhereQuery => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    return request.whereQuery;
  },
);

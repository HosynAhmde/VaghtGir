import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import type { AppRequest } from '../modules/request';

export interface TWhereQuery {
  [string:string]: any;
}

export const WhereQuery = createParamDecorator(
  (_data, ctx: ExecutionContext): TWhereQuery => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    console.log(request.whereQuery);
    
    return request.whereQuery;
  },
);

import type { AppRequest } from '@Common/modules/request';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

import type { Pagination as FilterType } from '../interfaces';

export const Filter = createParamDecorator(
  (_data: (keyof FilterType)[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    console.log(request.paginationFilter);
    
    return request.paginationFilter;
  },
);

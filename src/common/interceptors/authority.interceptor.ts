import type { AppRequest } from '@Common/modules/request';
import { queryRestriction } from '@Common/utils';

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class AuthorityInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const request = ctx.switchToHttp().getRequest<AppRequest>();

    const { permission, token } = request;

    if (!permission)
      throw new Error(
        'Permission is required please check your code and use @PolicyGuard',
      );

    request.whereQuery = queryRestriction(
      request.whereQuery ?? {},// this query came from QueryParserInterceptor
      permission,
      token,
    );

    return next.handle();
  }
}

import type { AppRequest } from '@Common/modules';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class QueryParserInterceptor implements NestInterceptor {
  intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const request = ctx.switchToHttp().getRequest<AppRequest>();

    const {limit, page, skip } = request.query;

    const filters: any = {
        limit,
        skip,
        page,
    };

    request.paginationFilter = filters;

    return next.handle();
  }
}

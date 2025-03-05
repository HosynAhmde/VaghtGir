import { ConfigNamespace } from '@Common/configuration/config.constant';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class ClearCookieInterceptor implements NestInterceptor {
  private readonly cookieOptions: CookieOptions;
  private readonly cookieName: string;

  constructor(private readonly configService: ConfigService) {
    const { cookie } = this.configService.get(ConfigNamespace.Auth);

    this.cookieOptions = cookie.cookieOptions;
    this.cookieName = cookie.name;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(responseDto => {
        response.clearCookie(this.cookieName, this.cookieOptions);
        return responseDto;
      }),
    );
  }
}

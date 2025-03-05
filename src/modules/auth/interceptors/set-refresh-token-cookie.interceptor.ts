import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';
import type { AuthSerializer } from '../serializers';
import { ConfigService } from '@nestjs/config';
import { ConfigNamespace } from '@Common/configuration/config.constant';



@Injectable()
export class SetRefreshTokenInterceptor implements NestInterceptor {
  private readonly cookieOptions: CookieOptions;
  private readonly cookieName: string;

  constructor(private configService: ConfigService) {
    const { cookie } = this.configService.get(ConfigNamespace.Auth);

    this.cookieOptions = cookie.cookieOptions;
    this.cookieName = cookie.name;
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<AuthSerializer> | Promise<Observable<AuthSerializer>> {
    const response: Response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap((dto: AuthSerializer) => {
        if (dto.refreshToken) {
          response.cookie(this.cookieName, dto.refreshToken, this.cookieOptions);
        }

        return dto;
      }),
    );
  }
}

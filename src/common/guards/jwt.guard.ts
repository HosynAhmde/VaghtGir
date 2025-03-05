import { ConfigNamespace } from '@Common/configuration/config.constant';
import { TokenOptions } from '@Common/interfaces';
import { BlacklistedService } from '@Common/modules/blacklisted';
import type { AppRequest } from '@Common/modules/request';
import { JwtToken } from '@Modules/auth/interface';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly accessToken: TokenOptions;

  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklisted: BlacklistedService,
    readonly configService: ConfigService,
    private reflector: Reflector,
  ) {
    const { accessToken } = configService.get(ConfigNamespace.Auth);
    this.accessToken = accessToken;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const rawToken =
      request.headers.authorization?.split(/\s+/g)[1] ??
      (request.query.token as string);

    if (!rawToken) throw new UnauthorizedException('AUTH.TOKEN_REQUIRED');

    try {
      request.token = this.jwtService.verify<JwtToken>(rawToken, {
        secret: this.accessToken.secret,
      });

      const isBlacklisted = await this.blacklisted.isBlacklisted(
        ...Object.values(request.token),
      );

      
      return !isBlacklisted;
    } catch {
      throw new UnauthorizedException('AUTH.INVALID_TOKEN');
    }
  }
}

import { ConfigNamespace } from '@Common/configuration/config.constant';
import { TokenOptions } from '@Common/interfaces';
import { BlacklistedService } from '@Common/modules/blacklisted';
import type { AppRequest } from '@Common/modules/request';
import { JwtToken } from '@Modules/auth/interface';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshGuard implements CanActivate {
  
  private readonly refreshToken: TokenOptions;
  private readonly cookieName: string;
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly blacklisted: BlacklistedService,
    readonly configService: ConfigService,
  ) {
    const { refreshToken, cookie } = configService.get(ConfigNamespace.Auth);
    this.cookieName = cookie.name;
    this.refreshToken = refreshToken;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AppRequest>();

    const rawToken = request.cookies[this.cookieName] ?? request.body.refresh;

    if (!rawToken) throw new UnauthorizedException('AUTH.TOKEN_REQUIRED');

    try {
      request.refreshToken = this.jwtService.verify<JwtToken>(rawToken, {
        secret: this.refreshToken.secret,
      });

      const isBlacklisted = await this.blacklisted.isBlacklisted(
        ...Object.values(request.refreshToken),
      );

      return !isBlacklisted;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('AUTH.INVALID_TOKEN');
    }
  }
}

import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { CookieParserMiddleware } from './cookie-parser/cookie.middleware';
import { CorsMiddleware } from './cors/cors.middleware';
import { HelmetMiddleware } from './helmet/helmet.middleware';
import { RequestClientIp } from './request-ip.middleware';
import { RequestUserAgentMiddleware } from './user-agent.middleware';
import { XRequestIdMiddleware } from './x-request-id.middleware';

@Module({})
export class MiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        RequestUserAgentMiddleware,
        RequestClientIp,
        XRequestIdMiddleware,
        CorsMiddleware,
        HelmetMiddleware,
        CookieParserMiddleware,
      )
      .forRoutes('*');
  }
}

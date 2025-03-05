import { ConfigNamespace } from '@Common/configuration/config.constant';
import type { NestMiddleware } from '@nestjs/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const corsConfig = this.configService.get(ConfigNamespace.Cors);

    const allowOrigin = corsConfig.allowOrigin;

    const corsOptions: CorsOptions = {
      origin: allowOrigin,
      methods: corsConfig.allowMethods,
      allowedHeaders: corsConfig.allowHeaders,
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };

    cors(corsOptions)(req, res, next);
  }
}

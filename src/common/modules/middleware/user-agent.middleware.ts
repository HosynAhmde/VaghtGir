import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import { UAParser } from 'ua-parser-js';

import type { AppRequest } from '../request';

@Injectable()
export class RequestUserAgentMiddleware implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction) {
    const parserUserAgent = new UAParser(req['User-Agent']);
    const userAgent = parserUserAgent.getResult();

    req.___userAgent = userAgent;
    next();
  }
}

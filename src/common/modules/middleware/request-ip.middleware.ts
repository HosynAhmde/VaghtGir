import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { NextFunction, Response } from 'express';
import * as requestIp from 'request-ip';

import type { AppRequest } from '../request';

@Injectable()
export class RequestClientIp implements NestMiddleware {
  use(req: AppRequest, res: Response, next: NextFunction) {
    req.clientIpAddress = requestIp.getClientIp(req);
    next();
  }
}

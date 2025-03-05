import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { HttpAdapterHost } from '@nestjs/core';
import type { Response } from 'express';

import type { AppRequest } from '../request';
import type { ErrorResponse } from './error-response.interface';
import { isDev, isStaging } from '@Common/utils/node.util';

@Catch()
export class HttpFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request = ctx.getRequest<AppRequest>();

    const path = request.path;

    if (isDev || isStaging) {
      console.log({ path, exception });
    }

    if (exception instanceof HttpException) {
      const statusHttp: number = exception.getStatus();
      const responseExpress: Response = ctx.getResponse<Response>();

      const response = exception.getResponse();

      if (!this.isErrorException(response)) {
        return responseExpress.status(statusHttp).json(response);
      }

      const responseException = response;

      const { statusCode, message, error, errors } = responseException;

      const resResponse = {
        statusCode: statusCode || statusHttp,
        message,
        error:
          error && Object.keys(error).length > 0 ? error : exception.message,
        errors,
        path,
      };

      responseExpress.status(statusHttp).json(resResponse);
    } else {
      const { httpAdapter } = this.httpAdapterHost;

      const responseBody = {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'SERVER.INTERNAL_SERVER_ERROR',
        error:
          exception instanceof Error && 'message' in exception
            ? exception.message
            : undefined,
        path,
      };

      const responseExpress = ctx.getResponse();

      return httpAdapter.reply(
        responseExpress,
        responseBody,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  isErrorException(obj: any): obj is ErrorResponse {
    return 'statusCode' in obj && 'message' in obj;
  }
}

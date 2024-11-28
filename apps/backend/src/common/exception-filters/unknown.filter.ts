import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class UnknownExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = 'Internal Server Errors';

    return httpAdapter.reply(
      ctx.getResponse(),
      {
        statusCode,
        message,
      },
      statusCode,
    );
  }
}

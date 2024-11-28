import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { keyBy } from 'lodash';
import { z } from 'zod';

@Catch(z.ZodError)
export class ZodFilter<T extends z.ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const statusCode = 400;
    return res.status(statusCode).json({
      errors: keyBy(exception.errors, 'path'),
      message: exception.message,
      statusCode,
    });
  }
}

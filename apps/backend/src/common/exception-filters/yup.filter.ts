import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { keyBy } from 'lodash';
import * as yup from 'yup';

@Catch(yup.ValidationError)
export class YupFilter<T extends yup.ValidationError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const statusCode = 400;
    return res.status(statusCode).json({
      errors: keyBy(exception.inner, 'path'),
      message: exception.message,
      statusCode,
    });
  }
}

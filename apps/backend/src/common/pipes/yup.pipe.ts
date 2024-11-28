import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as yup from 'yup';

export class YupValidationPipe implements PipeTransform {
  constructor(private schema: yup.ObjectSchema<any>) {}

  async transform(value: unknown, metadata: ArgumentMetadata) {
    const parsedValue = await this.schema.validate(value);
    return parsedValue;
  }
}

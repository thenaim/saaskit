import { VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { json } from 'express';

import { AppModule } from './app.module';
import {
  HttpExceptionFilter,
  UnknownExceptionFilter,
  YupFilter,
} from './common/exception-filters';
import { ZodFilter } from './common/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Limit body size
   */
  app.use(json({ limit: '5mb' }));

  /**
   * Cookie Parser
   */
  app.use(cookieParser());

  /**
   * Cors
   */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /**
   * Versioning
   */
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api', { exclude: ['auth/(.*)'] });

  /**
   * Global Filters
   */
  app.useGlobalFilters(
    new UnknownExceptionFilter(app.get(HttpAdapterHost)),
    new HttpExceptionFilter(),
    new ZodFilter(),
    new YupFilter(),
  );

  /**
   * App (listen)
   */
  await app.listen(4200);
}

void bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AppController } from './app.controller';
import { HttpExceptionFilter } from './common/exception-filters';
import { validate } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { ProviderModule } from './modules/auth/provider/provider.module';
import { BlogModule } from './modules/blog/blog.module';
import { DiscountModule } from './modules/discount/discount.module';
import { EmailProviderModule } from './modules/email-provider/email-provider.module';
import { OauthProviderModule } from './modules/oauth-provider/oauth-provider.module';
import { PaymentModule } from './modules/payment/payment.module';
import { PaymentProviderModule } from './modules/payment-provider/payment-provider.module';
import { PlanModule } from './modules/plan/plan.module';
import { ProductModule } from './modules/product/product.module';
import { ProjectModule } from './modules/project/project.module';
import { PublicModule } from './modules/public/public.module';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { SessionModule } from './services/session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'development' ? '.env' : '.env.production',
      isGlobal: true,
      validate,
    }),
    UserModule,
    PrismaModule,
    PublicModule,
    SessionModule,
    AuthModule,
    ProviderModule,
    PaymentModule,
    PaymentProviderModule,
    ProductModule,
    DiscountModule,
    PlanModule,
    EmailProviderModule,
    OauthProviderModule,
    BlogModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

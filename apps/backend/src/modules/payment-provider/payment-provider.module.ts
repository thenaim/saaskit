import { Module } from '@nestjs/common';

import { PaddlePaymentProviderController } from './controllers/paddle.controller';
import { PaymentProviderController } from './controllers/payment-provider.controller';
import { PaddlePaymentProviderService } from './services/paddle.service';
import { PaymentProviderService } from './services/payment-provider.service';

@Module({
  controllers: [PaymentProviderController, PaddlePaymentProviderController],
  providers: [PaymentProviderService, PaddlePaymentProviderService],
})
export class PaymentProviderModule {}

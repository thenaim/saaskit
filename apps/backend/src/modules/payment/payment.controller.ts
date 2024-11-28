import { Controller } from '@nestjs/common';

import { PaymentService } from './payment.service';

@Controller({
  path: 'payment',
  version: '1',
})
export class PaymentController {
  constructor(private readonly publicService: PaymentService) {}
}

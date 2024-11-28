import { Module } from '@nestjs/common';

import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';

@Module({
  controllers: [DiscountController],
  providers: [DiscountService],
})
export class DiscountModule {}

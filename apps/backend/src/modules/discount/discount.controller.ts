import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  getProductDiscountsSchema,
  IGetProductDiscounts,
} from '@repo/api/index';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { DiscountService } from './discount.service';

@Controller({
  path: 'product/discounts',
  version: '1',
})
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getDiscounts(
    @Query(new YupValidationPipe(getProductDiscountsSchema))
    query: IGetProductDiscounts['payload'],
  ) {
    try {
      return await this.discountService.getDiscounts(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

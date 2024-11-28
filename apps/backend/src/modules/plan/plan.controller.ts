import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { getProductPlansSchema, IGetProductPlans } from '@repo/api/index';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { PlanService } from './plan.service';

@Controller({
  path: 'product/plans',
  version: '1',
})
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getPlans(
    @Query(new YupValidationPipe(getProductPlansSchema))
    query: IGetProductPlans['payload'],
  ) {
    try {
      return await this.planService.getPlans(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/list')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getPlansList() {
    try {
      return await this.planService.getPlansList();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

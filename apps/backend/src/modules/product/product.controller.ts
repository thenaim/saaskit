import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  createProductOneTimeSchema,
  createProductSubscriptionSchema,
  getProductOneTimesSchema,
  ICreateProductOneTime,
  ICreateProductSubscription,
  IGetProductOneTimes,
  IGetProductSubscriptions,
} from '@repo/api/index';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { ProductService } from './product.service';

@Controller({
  path: 'product',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/list')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getProductsList() {
    try {
      return await this.productService.getProductsList();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/one-times')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getOneTimeProducts(
    @Query(new YupValidationPipe(getProductOneTimesSchema))
    query: IGetProductOneTimes['payload'],
  ) {
    try {
      return await this.productService.getOneTimeProducts(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/one-times/create')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async createOneTimeProduct(
    @Body(new YupValidationPipe(createProductOneTimeSchema))
    body: ICreateProductOneTime['payload'],
  ) {
    try {
      return await this.productService.createOneTimeProduct(body);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/one-times/:id/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateOneTimeProduct(
    @Body(new YupValidationPipe(createProductOneTimeSchema))
    body: ICreateProductOneTime['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.productService.updateOneTimeProduct(body, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Get('/subscriptions')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getSubscriptionProducts(
    @Query(new YupValidationPipe(getProductOneTimesSchema))
    query: IGetProductSubscriptions['payload'],
  ) {
    try {
      return await this.productService.getSubscriptionProducts(query);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/subscriptions/create')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async createProductSubscription(
    @Body(new YupValidationPipe(createProductSubscriptionSchema))
    body: ICreateProductSubscription['payload'],
  ) {
    try {
      return await this.productService.createProductSubscription(body);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/subscriptions/:id/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateSubscriptionProduct(
    @Body(new YupValidationPipe(createProductSubscriptionSchema))
    body: ICreateProductSubscription['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.productService.updateSubscriptionProduct(body, id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getProduct(@Param('id') id: string) {
    try {
      return await this.productService.getProduct(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }
}

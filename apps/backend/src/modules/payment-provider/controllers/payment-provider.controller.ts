import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  IUpdatePaymentProviderById,
  updatePaymentProviderByIdSchema,
} from '@repo/api/index';
import { Request } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { PaymentProviderService } from '../services/payment-provider.service';

@Controller({
  path: 'payment/providers',
  version: '1',
})
export class PaymentProviderController {
  constructor(
    private readonly paymentProviderService: PaymentProviderService,
  ) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getPaymentProviders(@Req() req: Request) {
    try {
      return await this.paymentProviderService.getPaymentProviders(
        req.project!.id,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getPaymentProviderById(
    @Req() req: Request,
    @Param('id') id: string,
    @Query(
      'withCredentials',
      new DefaultValuePipe(false),
      new ParseBoolPipe({
        optional: true,
        exceptionFactory: () => new BadRequestException(),
      }),
    )
    withCredentials: boolean,
  ) {
    try {
      return await this.paymentProviderService.getPaymentProviderById(
        req.project!.id,
        id,
        withCredentials,
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/:id/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updatePaymentProviderById(
    @Req() req: Request,
    @Body(new YupValidationPipe(updatePaymentProviderByIdSchema))
    body: IUpdatePaymentProviderById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.paymentProviderService.updatePaymentProviderById(
        req.project!.id,
        id,
        body,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/:id/credentials/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updatePaymentProviderCredentialById(
    @Req() req: Request,
    @Body() body: any,
    @Param('id') id: string,
  ) {
    try {
      return await this.paymentProviderService.updatePaymentProviderCredentialById(
        req.project!.id,
        id,
        body,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }
}

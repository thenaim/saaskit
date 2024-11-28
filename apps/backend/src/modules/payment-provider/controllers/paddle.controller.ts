import {
  BadRequestException,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaddlePaymentProviderGuard } from 'src/guards/payment-provider/paddle.guard';
import { RequestWithPaddle } from 'src/interfaces/Common';

import { PaddlePaymentProviderService } from '../services/paddle.service';

@Controller({
  path: 'payment/providers/paddle',
  version: '1',
})
export class PaddlePaymentProviderController {
  constructor(
    private readonly paddlePaymentProviderService: PaddlePaymentProviderService,
  ) {}

  @Post('/webhook')
  @HttpCode(200)
  @UseGuards(PaddlePaymentProviderGuard)
  async webhook(@Req() req: RequestWithPaddle) {
    try {
      return await this.paddlePaymentProviderService.webhook(req.eventEntity);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

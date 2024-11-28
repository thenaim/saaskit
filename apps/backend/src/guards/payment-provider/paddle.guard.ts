import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Paddle } from '@paddle/paddle-node-sdk';
import { PaymentProvider } from '@repo/database/index';
import { IEnvConfig } from 'src/config/configuration';
import { RequestWithPaddle } from 'src/interfaces/Common';
import { decrypt } from 'src/utils/encrypt-decrypt';

import { PrismaService } from '../../services/prisma/prisma.service';

@Injectable()
export class PaddlePaymentProviderGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService<IEnvConfig, true>,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: RequestWithPaddle = context.switchToHttp().getRequest();

    const signature = req.headers['paddle-signature'];
    if (!signature) {
      throw new BadRequestException('Missing paddle signature');
    }

    try {
      const paddleProvider =
        await this.prisma.projectPaymentProvider.findFirstOrThrow({
          where: {
            provider: PaymentProvider.paddle,
            isActive: true,
          },
        });

      const secretKey = decrypt(
        paddleProvider?.webhookSecret || '',
        this.config.get('APP_SECRET'),
      );
      const API_KEY = decrypt(
        paddleProvider?.vendorAuthCode || '',
        this.config.get('APP_SECRET'),
      );

      const paddle = new Paddle(API_KEY);
      const eventData = paddle.webhooks.unmarshal(
        JSON.stringify(req.body),
        secretKey,
        signature as string,
      );

      if (!eventData) {
        throw new BadRequestException('Webhook validate error');
      }

      req.eventEntity = eventData;

      return true;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}

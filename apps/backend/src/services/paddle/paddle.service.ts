import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Paddle } from '@paddle/paddle-node-sdk';
import { PaymentProvider } from '@repo/database/index';
import { IEnvConfig } from 'src/config/configuration';
import { decrypt } from 'src/utils/encrypt-decrypt';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaddleService implements OnModuleInit {
  initPaddle: Paddle | undefined;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService<IEnvConfig, true>,
  ) {}

  paddle() {
    return this.initPaddle!;
  }

  async onModuleInit() {
    try {
      const paddleProvider =
        await this.prisma.projectPaymentProvider.findFirstOrThrow({
          where: {
            provider: PaymentProvider.paddle,
            isActive: true,
          },
          select: {
            vendorAuthCode: true,
          },
        });

      const API_KEY = decrypt(
        paddleProvider?.vendorAuthCode || '',
        this.config.get('APP_SECRET'),
      );

      this.initPaddle = new Paddle(API_KEY);
    } catch (error) {
      console.log('Paddle init error', (error as any)?.message);
    }
  }
}

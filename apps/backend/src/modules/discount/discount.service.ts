import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGetProductDiscounts } from '@repo/api/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class DiscountService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getDiscounts(
    query: IGetProductDiscounts['payload'],
  ): Promise<IGetProductDiscounts['response']> {
    const data = await this.prisma.discount.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        amount: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        [query.id]: query.desc ? 'desc' : 'asc',
      },
    });

    return {
      data,
      success: true,
    };
  }
}

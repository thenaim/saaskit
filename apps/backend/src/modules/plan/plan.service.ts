import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGetProductPlans } from '@repo/api/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class PlanService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getPlans(
    query: IGetProductPlans['payload'],
  ): Promise<IGetProductPlans['response']> {
    const data = await this.prisma.plan.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        productId: true,
        product: {
          select: {
            name: true,
          },
        },
        interval: true,
        intervalCount: true,
        trialInterval: true,
        trialIntervalCount: true,
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

  async getPlansList() {
    const data = await this.prisma.plan.findMany({
      select: {
        id: true,
        name: true,
        trialInterval: true,
        trialIntervalCount: true,
      },
    });

    return {
      data,
      success: true,
    };
  }
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IGetProductOneTimes,
  ProductType,
  IGetProductSubscriptions,
  ICreateProductOneTime,
  ICreateProductSubscription,
  IGetProduct,
  IUpdateProductOneTime,
  IUpdateProductSubscription,
  IGetProductsList,
} from '@repo/api/index';
import slugify from 'slugify';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getProductsList(): Promise<IGetProductsList['response']> {
    const data = await this.prisma.product.findMany({
      where: {
        type: ProductType.onetime,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      data,
      success: true,
    };
  }

  async getOneTimeProducts(
    query: IGetProductOneTimes['payload'],
  ): Promise<IGetProductOneTimes['response']> {
    const data = await this.prisma.product.findMany({
      where: {
        type: ProductType.onetime,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        isDefault: true,
        isPopular: true,
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

  async createOneTimeProduct(
    body: ICreateProductOneTime['payload'],
  ): Promise<ICreateProductOneTime['response']> {
    body.slug = (
      body?.slug ? slugify(body.slug) : slugify(body.name)
    ).toLowerCase();
    const data = await this.prisma.product.create({
      data: {
        ...body,
        type: ProductType.onetime,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        isActive: true,
        metadata: true,
        features: true,
        isPopular: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { data, success: true };
  }

  async updateOneTimeProduct(
    body: IUpdateProductOneTime['payload'],
    id: string,
  ): Promise<IUpdateProductOneTime['response']> {
    body.slug = body?.slug
      ? slugify(body.slug, { lower: true })
      : slugify(body.name, { lower: true });

    // Check item exist by id
    const find = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }

    // Check other item exist with current slug
    const check = await this.prisma.product.findFirst({
      where: {
        slug: body?.slug,
        AND: {
          NOT: {
            id: find.id,
          },
        },
      },
    });
    if (check) {
      throw new ConflictException();
    }

    const data = await this.prisma.product.update({
      where: {
        id: find.id,
      },
      data: body,
    });

    return { data, success: true };
  }

  async getSubscriptionProducts(
    query: IGetProductSubscriptions['payload'],
  ): Promise<IGetProductSubscriptions['response']> {
    const data = await this.prisma.product.findMany({
      where: {
        type: ProductType.subscription,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        isActive: true,
        isDefault: true,
        isPopular: true,
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

  async createProductSubscription(
    body: ICreateProductSubscription['payload'],
  ): Promise<ICreateProductSubscription['response']> {
    body.slug = body?.slug
      ? slugify(body.slug, { lower: true })
      : slugify(body.name, { lower: true });

    const data = await this.prisma.product.create({
      data: {
        ...body,
        type: ProductType.subscription,
      },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        isActive: true,
        metadata: true,
        features: true,
        isPopular: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { data, success: true };
  }

  async updateSubscriptionProduct(
    body: IUpdateProductSubscription['payload'],
    id: string,
  ): Promise<IUpdateProductSubscription['response']> {
    body.slug = body?.slug
      ? slugify(body.slug, { lower: true })
      : slugify(body.name, { lower: true });

    // Check item exist by id
    const find = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }

    // Check other item exist with current slug
    const check = await this.prisma.product.findFirst({
      where: {
        slug: body?.slug,
        AND: {
          NOT: {
            id: find.id,
          },
        },
      },
    });
    if (check) {
      throw new ConflictException();
    }

    const data = await this.prisma.product.update({
      where: {
        id: find.id,
      },
      data: body,
    });

    return { data, success: true };
  }

  async getProduct(id: string): Promise<IGetProduct['response']> {
    const data = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return {
      data,
      success: true,
    };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IGetPaymentProviderById,
  IGetPaymentProviders,
  IUpdatePaymentProviderById,
  Prisma,
  updatPaymentProviderCredentialSchema,
} from '@repo/api/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { decrypt, encrypt } from 'src/utils/encrypt-decrypt';

@Injectable()
export class PaymentProviderService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getPaymentProviders(
    projectId: string,
  ): Promise<IGetPaymentProviders['response']> {
    const { providers } = await this.prisma.projectPayment.findUniqueOrThrow({
      where: {
        projectId,
      },
      select: {
        id: true,
        providers: {
          select: {
            id: true,
            name: true,
            provider: true,
            isActive: true,
          },
        },
      },
    });

    return {
      data: providers,
      success: true,
    };
  }

  async getPaymentProviderById(
    projectId: string,
    id: string,
    withCredentials: boolean,
  ): Promise<IGetPaymentProviderById['response']> {
    const credentialsSelect: Prisma.ProjectPaymentProviderSelectScalar = {
      verndorId: true,
      clientSideToken: true,
      vendorAuthCode: true,
      webhookSecret: true,
    };
    const data = await this.prisma.projectPaymentProvider.findUniqueOrThrow({
      where: {
        id,
        payment: {
          projectId,
        },
      },
      select: {
        id: true,
        name: true,
        provider: true,
        isActive: true,
        ...(withCredentials && credentialsSelect),
      },
    });

    console.log('TEST');

    for (const key of Object.keys(credentialsSelect)) {
      data[key] = decrypt(
        data[key],
        this.configService.get('APP_SECRET') as string,
      );
    }

    return {
      data,
      success: true,
    };
  }

  async updatePaymentProviderById(
    projectId: string,
    id: string,
    body: IUpdatePaymentProviderById['payload'],
  ): Promise<IUpdatePaymentProviderById['response']> {
    const find = await this.prisma.projectPaymentProvider.findFirst({
      where: {
        id,
        payment: {
          projectId,
        },
      },
    });
    if (!find) {
      throw new NotFoundException();
    }
    const data = await this.prisma.projectPaymentProvider.update({
      where: {
        id: find.id,
      },
      data: body,
      select: {
        id: true,
        name: true,
        provider: true,
        isActive: true,
      },
    });

    return { data, success: true };
  }

  async updatePaymentProviderCredentialById(
    projectId: string,
    id: string,
    body: any,
  ) {
    const find = await this.prisma.projectPaymentProvider.findFirst({
      where: {
        id,
        payment: {
          projectId,
        },
      },
    });

    if (!find) {
      throw new NotFoundException();
    }

    const validatedBody =
      await updatPaymentProviderCredentialSchema[find.provider].validate(body);

    for (const key in validatedBody) {
      if (Object.prototype.hasOwnProperty.call(validatedBody, key)) {
        validatedBody[key] = encrypt(
          validatedBody[key],
          this.configService.get('APP_SECRET') as string,
        );
      }
    }

    const data = await this.prisma.projectPaymentProvider.update({
      where: {
        id: find.id,
      },
      data: validatedBody,
      select: {
        id: true,
        name: true,
        provider: true,
      },
    });

    return { data, success: true };
  }
}

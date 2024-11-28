import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  IGetOauthProviderById,
  IGetOauthProviders,
  IUpdateOauthProviderById,
  updatOauthProviderCredentialSchema,
  Prisma,
} from '@repo/api/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { decrypt, encrypt } from 'src/utils/encrypt-decrypt';

@Injectable()
export class OauthProviderService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getOauthProviders(
    projectId: string,
  ): Promise<IGetOauthProviders['response']> {
    const providers = await this.prisma.projectAuthProvider.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        name: true,
        provider: true,
        isEnabled: true,
      },
    });

    return {
      data: providers,
      success: true,
    };
  }

  async getOauthProviderById(
    projectId: string,
    id: string,
    withCredentials: boolean,
  ): Promise<IGetOauthProviderById['response']> {
    const credentialsSelect: Prisma.ProjectAuthProviderSelectScalar = {
      clientId: true,
      clientSecret: true,
    };
    const data = await this.prisma.projectAuthProvider.findUniqueOrThrow({
      where: {
        id,
        projectId,
      },
      select: {
        id: true,
        name: true,
        provider: true,
        isEnabled: true,
        ...(withCredentials && credentialsSelect),
      },
    });

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

  async updateOauthProviderById(
    id: string,
    body: IUpdateOauthProviderById['payload'],
  ): Promise<IUpdateOauthProviderById['response']> {
    const find = await this.prisma.projectAuthProvider.findFirst({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }

    const data = await this.prisma.projectAuthProvider.update({
      where: {
        id: find.id,
      },
      data: body,
      select: {
        id: true,
        name: true,
        provider: true,
        isEnabled: true,
      },
    });

    return { data, success: true };
  }

  async updateOauthProviderCredentialById(id: string, body: any) {
    const find = await this.prisma.projectAuthProvider.findFirst({
      where: {
        id,
      },
    });

    if (!find) {
      throw new NotFoundException();
    }

    const validatedBody =
      await updatOauthProviderCredentialSchema[find.provider].validate(body);

    for (const key in validatedBody) {
      if (Object.prototype.hasOwnProperty.call(validatedBody, key)) {
        validatedBody[key] = encrypt(
          validatedBody[key],
          this.configService.get('APP_SECRET') as string,
        );
      }
    }

    const data = await this.prisma.projectAuthProvider.update({
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

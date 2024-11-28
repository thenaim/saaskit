import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ConfigService } from '@nestjs/config';
import {
  EmailProvider,
  IGetEmailProviderById,
  IGetEmailProviders,
  ITestEmailProviderById,
  IUpdateEmailProviderById,
  updatEmailProviderCredentialSchema,
} from '@repo/api/index';
import { sendByProvider } from '@repo/mail/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { decrypt, encrypt } from 'src/utils/encrypt-decrypt';

@Injectable()
export class EmailProviderService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async getEmailProviders(
    projectId: string,
  ): Promise<IGetEmailProviders['response']> {
    const { providers } = await this.prisma.projectEmail.findUniqueOrThrow({
      where: {
        projectId,
      },
      select: {
        providers: {
          select: {
            id: true,
            name: true,
            provider: true,
          },
        },
      },
    });

    return {
      data: providers,
      success: true,
    };
  }

  async getEmailProviderById(
    projectId: string,
    id: string,
    withCredentials: boolean,
  ): Promise<IGetEmailProviderById['response']> {
    const credentialsSelect = {
      domain: true,
      secret: true,
      endpoint: true,
      token: true,
      key: true,
      region: true,
      host: true,
      port: true,
      username: true,
      password: true,
    };
    const data = await this.prisma.projectEmailProvider.findUniqueOrThrow({
      where: {
        id,
        email: {
          projectId,
        },
      },
      select: {
        id: true,
        name: true,
        provider: true,
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

  async updateEmailProviderById(
    id: string,
    body: IUpdateEmailProviderById['payload'],
  ): Promise<IUpdateEmailProviderById['response']> {
    const find = await this.prisma.projectEmailProvider.findFirst({
      where: {
        id,
      },
    });
    if (!find) {
      throw new NotFoundException();
    }
    const data = await this.prisma.projectEmailProvider.update({
      where: {
        id: find.id,
      },
      data: body,
      select: {
        id: true,
        name: true,
        provider: true,
      },
    });

    return { data, success: true };
  }

  async testEmailProviderById(
    id: string,
    body: ITestEmailProviderById['payload'],
  ): Promise<ITestEmailProviderById['response']> {
    const credentialsSelect = {
      domain: true,
      secret: true,
      endpoint: true,
      token: true,
      key: true,
      region: true,
      host: true,
      port: true,
      username: true,
      password: true,
    };

    const item = await this.prisma.projectEmailProvider.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        provider: true,
        ...credentialsSelect,
      },
    });

    if (!item) {
      throw new NotFoundException();
    }

    for (const key of Object.keys(credentialsSelect)) {
      item[key] = decrypt(
        item[key],
        this.configService.get('APP_SECRET') as string,
      );
    }

    switch (item.provider) {
      case EmailProvider.smtp: {
        const sendResult = await sendByProvider({
          type: EmailProvider.smtp,
          data: {
            transport: {
              host: item?.host ?? '',
              port: item?.port ? +item.port : undefined,
              secure: false,
              auth: {
                user: item?.username ?? '',
                pass: item?.password ?? '',
              },
            },
            options: {
              from: 'demo@demo.dev',
              to: body.email,
              subject: `Confirm your email address for ${'APP_NAME'}`,
              html: body.body,
            },
          },
        });
        return { data: null, success: sendResult.success };
      }
      case EmailProvider.sendgrid: {
        const sendResult = await sendByProvider({
          type: EmailProvider.sendgrid,
          data: {
            options: {
              from: 'demo@demo.dev',
              to: body.email,
              subject: `Confirm your email address for ${'APP_NAME'}`,
              html: body.body,
            },
            SENDGRID_API_KEY: item?.key ?? '',
          },
        });
        return { data: null, success: sendResult.success };
      }
    }

    return { data: null, success: true };
  }

  async updateEmailProviderCredentialById(id: string, body: any) {
    const find = await this.prisma.projectEmailProvider.findFirst({
      where: {
        id,
      },
    });

    if (!find) {
      throw new HttpErrorByCode[HttpStatus.NOT_FOUND]();
    }

    const validatedBody =
      await updatEmailProviderCredentialSchema[find.provider].validate(body);

    for (const key in validatedBody) {
      if (Object.prototype.hasOwnProperty.call(validatedBody, key)) {
        validatedBody[key] = encrypt(
          validatedBody[key],
          this.configService.get('APP_SECRET') as string,
        );
      }
    }

    const data = await this.prisma.projectEmailProvider.update({
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

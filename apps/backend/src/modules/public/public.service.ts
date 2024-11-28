import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Prisma } from '@repo/api/index';
import { type Request, type Response } from 'express';
import { PrismaService } from 'src/services/prisma/prisma.service';

const defaultProjectSelect = {
  id: true,
  name: true,
  description: true,
  supportEmail: true,
  analytics: {
    select: {
      id: true,
      isCookieConsentBarEnabled: true,
      googleTrackingId: true,
      trackingScripts: true,
    },
  },
  email: {
    select: {
      id: true,
      defaultEmailProvider: true,
      defaultEmailFromName: true,
      defaultEmailFromEmail: true,
    },
  },
  payment: {
    select: {
      id: true,
      defaultCurrency: true,
      isPaymentProration: true,
    },
  },
  reCaptcha: {
    select: {
      id: true,
      isReCaptchaEnabled: true,
      reCaptchaApiSiteKey: true,
      reCaptchaApiSiteSecret: true,
    },
  },
} as Prisma.ProjectSelect;

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async oauthProviders(req: Request, res: Response) {
    try {
      const data = await this.prisma.projectAuthProvider.findMany({
        where: {
          isEnabled: true,
          AND: {
            project: {
              isActive: true,
            },
          },
        },
        select: {
          name: true,
          provider: true,
        },
      });

      return res.json({
        data,
        success: true,
      });
    } catch (error) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }
}

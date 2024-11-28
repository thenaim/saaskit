import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import {
  IGetProject,
  IUpdateProjectAnalytics,
  IUpdateProjectAplication,
  IUpdateProjectEmail,
  IUpdateProjectPayment,
  IUpdateProjectReCaptcha,
  Prisma,
} from '@repo/api/index';
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
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async getProject(req: Request, res: Response<IGetProject['response']>) {
    try {
      const data = await this.prisma.project.findUniqueOrThrow({
        where: {
          isActive: true,
        },
        select: defaultProjectSelect,
      });

      return res.json({
        data,
        success: true,
      });
    } catch (error) {
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }

  async updateProjectApplication(
    req: Request,
    res: Response<IUpdateProjectAplication['response']>,
    body: IUpdateProjectAplication['payload'],
  ) {
    try {
      const data = await this.prisma.project.update({
        where: {
          isActive: true,
        },
        data: body,
        select: defaultProjectSelect,
      });

      return res.json({ data, success: true });
    } catch (error) {
      if (error instanceof HttpErrorByCode[HttpStatus.NOT_FOUND]) {
        throw error;
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }

  async updateProjectPayment(
    req: Request,
    res: Response<IUpdateProjectPayment['response']>,
    body: IUpdateProjectPayment['payload'],
  ) {
    try {
      const data = await this.prisma.project.update({
        where: {
          isActive: true,
        },
        data: {
          payment: {
            update: body,
          },
        },
        select: defaultProjectSelect,
      });

      return res.json({ data, success: true });
    } catch (error) {
      if (error instanceof HttpErrorByCode[HttpStatus.NOT_FOUND]) {
        throw error;
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }

  async updateProjectEmail(
    req: Request,
    res: Response<IUpdateProjectEmail['response']>,
    body: IUpdateProjectEmail['payload'],
  ) {
    try {
      const data = await this.prisma.project.update({
        where: {
          isActive: true,
        },
        data: {
          email: {
            update: body,
          },
        },
        select: defaultProjectSelect,
      });

      return res.json({ data, success: true });
    } catch (error) {
      if (error instanceof HttpErrorByCode[HttpStatus.NOT_FOUND]) {
        throw error;
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }

  async updateProjectAnalytics(
    req: Request,
    res: Response<IUpdateProjectAnalytics['response']>,
    body: IUpdateProjectAnalytics['payload'],
  ) {
    try {
      const data = await this.prisma.project.update({
        where: {
          isActive: true,
        },
        data: {
          analytics: {
            update: body,
          },
        },
        select: defaultProjectSelect,
      });

      return res.json({ data, success: true });
    } catch (error) {
      if (error instanceof HttpErrorByCode[HttpStatus.NOT_FOUND]) {
        throw error;
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }

  async updateProjectReCaptcha(
    req: Request,
    res: Response<IUpdateProjectReCaptcha['response']>,
    body: IUpdateProjectReCaptcha['payload'],
  ) {
    try {
      const data = await this.prisma.project.update({
        where: {
          isActive: true,
        },
        data: {
          reCaptcha: {
            update: body,
          },
        },
        select: defaultProjectSelect,
      });

      return res.json({ data, success: true });
    } catch (error) {
      if (error instanceof HttpErrorByCode[HttpStatus.NOT_FOUND]) {
        throw error;
      }
      throw new HttpErrorByCode[HttpStatus.BAD_REQUEST]();
    }
  }
}

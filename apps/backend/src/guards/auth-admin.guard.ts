import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Request } from 'express';

import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    try {
      if (req?.session?.user.isAdmin) {
        const project = await this.prisma.project.findFirst({
          where: {
            isActive: true,
          },
        });
        req.project = project;
        return true;
      }

      throw new Error();
    } catch (error) {
      throw new HttpErrorByCode[HttpStatus.UNAUTHORIZED]();
    }
  }
}

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Request } from 'express';
import { isEmpty } from 'lodash';

import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    try {
      const token = req.cookies['session'] as string;
      if (isEmpty(token)) {
        throw new Error();
      }

      const session = await this.prisma.session.findFirstOrThrow({
        where: { token },
        include: {
          user: true,
        },
      });
      req.session = session;

      return true;
    } catch (error) {
      throw new HttpErrorByCode[HttpStatus.UNAUTHORIZED]();
    }
  }
}

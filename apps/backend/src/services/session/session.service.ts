import { Injectable } from '@nestjs/common';
import { Session } from '@repo/database/index';
import dayjs from 'dayjs';
import randomString from 'src/utils/random-string';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(data: Pick<Session, 'userId'>) {
    const token = randomString(256);
    const session = await this.prisma.session.create({
      data: {
        ...data,
        token,
        expiresAt: dayjs().add(1, 'month').toDate(),
      },
    });

    return session;
  }

  async validateSession(token: string) {
    try {
      const { user, ...session } = await this.prisma.session.findFirstOrThrow({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });
      // delete (user as any).password;

      if (dayjs(session.expiresAt).isAfter(dayjs())) {
        return { session, user };
      }

      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  async generateVerificationToken(userId: string) {
    try {
      await this.prisma.verificationToken.deleteMany({ where: { userId } });

      const token = randomString(256);
      const verificationToken = await this.prisma.verificationToken.create({
        data: {
          userId,
          token,
          expiresAt: dayjs().add(10, 'minutes').toDate(),
        },
      });

      return verificationToken;
    } catch (error) {
      return undefined;
    }
  }

  async generatePasswordResetToken(userId: string) {
    try {
      await this.prisma.passwordResetToken.deleteMany({ where: { userId } });

      const token = randomString(256);
      const verificationToken = await this.prisma.passwordResetToken.create({
        data: {
          userId,
          token,
          expiresAt: dayjs().add(10, 'minutes').toDate(),
        },
      });

      return verificationToken;
    } catch (error) {
      return undefined;
    }
  }
}

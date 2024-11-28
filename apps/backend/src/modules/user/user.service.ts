import { Injectable } from '@nestjs/common';
import { IGetUsersList } from '@repo/api/index';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SessionService } from 'src/services/session/session.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
  ) {}

  async getAdminUsersList(): Promise<IGetUsersList['response']> {
    const data = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return {
      data,
      success: true,
    };
  }

  async me() {
    return { success: true };
  }
}

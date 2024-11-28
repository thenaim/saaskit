import {
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IResetPassword,
  ISignIn,
  ISignUpConfirm,
  ISignUp,
  IForgotPassword,
  EmailProvider,
  AuthProvider,
  IGetMe,
} from '@repo/api/index';
import {
  ConfirmEmailAddressEmailTemplate,
  sendByProvider,
  renderTemplate,
  ResetPasswordEmailTemplate,
} from '@repo/mail/index';
import { compare, hash } from 'bcrypt';
import dayjs from 'dayjs';
import randomString from 'src/utils/random-string';

import { PrismaService } from '../../services/prisma/prisma.service';
import { SessionService } from '../../services/session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly session: SessionService,
  ) {}

  async me(userId: string): Promise<IGetMe['response']> {
    const { password: _password, ...user } =
      await this.prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
      });

    return {
      data: user,
      success: true,
    };
  }

  async signin(body: ISignIn['payload']) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    if (!user.isConfirmed) {
      throw new PreconditionFailedException();
    }

    delete (user as any)?.password;
    if (!user.isAdmin) {
      delete (user as any)?.isAdmin;
    }

    const session = await this.session.createSession({ userId: user.id });

    return { user, session };
  }

  async signup(body: ISignUp['payload']) {
    const isUserExist = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        email: true,
      },
    });

    if (isUserExist) {
      throw new ConflictException();
    }

    const hashedPassword = await hash(body.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const verificationToken = await this.session.generateVerificationToken(
      user.id,
    );

    await sendByProvider({
      type: EmailProvider.smtp,
      data: {
        transport: {
          host: 'localhost',
          port: 1025,
          secure: false,
          auth: {
            user: '',
            pass: '',
          },
        },
        options: {
          from: 'demo@demo.dev',
          to: user.email,
          subject: `Confirm your email address for ${'APP_NAME'}`,
          html: renderTemplate(
            ConfirmEmailAddressEmailTemplate({
              user: {
                name: user.name,
              },
              emailConfirmLink: `http://localhost:3000/auth/confirm/${verificationToken?.token}`,
            }),
          ),
        },
      },
    });
  }

  async signout(token: string) {
    return this.prisma.session.delete({
      where: {
        token,
      },
    });
  }

  async confirm(body: ISignUpConfirm['payload']) {
    const verificationToken =
      await this.prisma.verificationToken.findFirstOrThrow({
        where: {
          token: body.token,
          expiresAt: {
            gte: dayjs().subtract(10, 'minutes').toDate(),
          },
        },
      });

    const { password: _password, ...user } = await this.prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isConfirmed: true },
    });

    const session = await this.session.createSession({ userId: user.id });

    await this.prisma.verificationToken.update({
      where: {
        id: verificationToken.id,
      },
      data: {
        expiresAt: dayjs().subtract(10, 'minutes').toDate(),
      },
    });

    return {
      user,
      session,
    };
  }

  async forgotPassword(body: IForgotPassword['payload']) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const passwordResetToken = await this.session.generatePasswordResetToken(
      user.id,
    );

    await sendByProvider({
      type: EmailProvider.smtp,
      data: {
        transport: {
          host: 'localhost',
          port: 1025,
          secure: false,
          auth: {
            user: '',
            pass: '',
          },
        },
        options: {
          from: 'demo@demo.dev',
          to: user.email,
          subject: `Reset your password for ${'APP_NAME'}`,
          html: renderTemplate(
            ResetPasswordEmailTemplate({
              user: {
                name: user.name,
              },
              resetPasswordLink: `http://localhost:3000/auth/reset-password/${passwordResetToken?.token}`,
            }),
          ),
        },
      },
    });
  }

  async resetPassword(body: IResetPassword['payload']) {
    const { user, ...passwordResetToken } =
      await this.prisma.passwordResetToken.findFirstOrThrow({
        where: {
          token: body.token,
          expiresAt: {
            gte: dayjs().subtract(10, 'minutes').toDate(),
          },
        },
        select: {
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          },
        },
      });

    const hashedPassword = await hash(body.password, 10);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  }

  async linkOrCreateUserWithProvider(
    provider: AuthProvider,
    providerUserId: string,
    {
      name,
      email,
    }: {
      name?: string | null;
      email: string;
    },
  ) {
    // Check if the account with this provider and providerUserId exists
    const existingAuthAccount = await this.prisma.authAccount.findUnique({
      where: {
        provider_providerUserId: {
          provider,
          providerUserId,
        },
      },
      include: {
        user: true,
      },
    });

    // If account is found, return the associated user
    if (existingAuthAccount) {
      return existingAuthAccount.user;
    }

    // Start a transaction to create a new user and link the provider account
    const newUser = await this.prisma.$transaction(async (prisma) => {
      // Check if a user with the provided email already exists
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUserByEmail) {
        // If user exists, link the provider account to this user
        await prisma.authAccount.create({
          data: {
            provider,
            providerUserId,
            userId: existingUserByEmail.id,
          },
        });
        // After link confirm email
        await prisma.user.update({
          where: {
            id: existingUserByEmail.id,
          },
          data: {
            isConfirmed: true,
          },
        });

        return existingUserByEmail;
      }

      // If no user is found, create a new user
      const newUser = await this.prisma.user.create({
        data: {
          name,
          email,
          isConfirmed: true,
          password: await hash(randomString(32), 10),
        },
      });

      // Link the provider account to the newly created user
      await this.prisma.authAccount.create({
        data: {
          provider,
          providerUserId,
          userId: newUser.id,
        },
      });

      return newUser;
    });

    // Return the newly created or existing user
    return newUser;
  }
}

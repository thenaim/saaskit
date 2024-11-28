import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthProvider } from '@repo/api/index';
import { IEnvConfig } from 'src/config/configuration';
import { SessionService } from 'src/services/session/session.service';
import { decrypt } from 'src/utils/encrypt-decrypt';
import { Facebook } from 'src/utils/providers/facebook';
import { Google } from 'src/utils/providers/google';

import { PrismaService } from '../../../services/prisma/prisma.service';
import { AuthService } from '../auth.service';

@Injectable()
export class ProviderService {
  constructor(
    private config: ConfigService<IEnvConfig, true>,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  async redirect(provider: AuthProvider) {
    const findProvider = await this.prisma.projectAuthProvider.findFirstOrThrow(
      {
        where: {
          provider,
          isEnabled: true,
        },
      },
    );

    switch (provider) {
      case AuthProvider.google: {
        const google = new Google(
          decrypt(findProvider.clientId!, this.config.get('APP_SECRET')),
          decrypt(findProvider.clientSecret!, this.config.get('APP_SECRET')),
          `${this.config.get('API_URL')}/auth/providers/${AuthProvider.google}/callback`,
        );
        return google.createAuthorizationURL({
          scope: ['https://www.googleapis.com/auth/userinfo.email'],
          prompt: 'select_account',
        });
      }
      case AuthProvider.facebook: {
        const facebook = new Facebook(
          decrypt(findProvider.clientId!, this.config.get('APP_SECRET')),
          decrypt(findProvider.clientSecret!, this.config.get('APP_SECRET')),
          `${this.config.get('API_URL')}/auth/providers/${AuthProvider.facebook}/callback`,
        );

        return facebook.createAuthorizationURL('hello');
      }
    }
  }

  async callback(provider: AuthProvider, code: string) {
    const findProvider = await this.prisma.projectAuthProvider.findFirstOrThrow(
      {
        where: {
          provider,
          isEnabled: true,
        },
      },
    );

    switch (provider) {
      case AuthProvider.google: {
        const google = new Google(
          decrypt(findProvider.clientId!, this.config.get('APP_SECRET')),
          decrypt(findProvider.clientSecret!, this.config.get('APP_SECRET')),
          `${this.config.get('API_URL')}/auth/providers/${AuthProvider.google}/callback`,
        );

        const token = await google.validateAuthorizationCode(code);
        const userinfo = await google.getUserinfo(token.res?.data.access_token);

        const user = await this.authService.linkOrCreateUserWithProvider(
          AuthProvider.google,
          userinfo.data.id!,
          {
            name: userinfo.data.name,
            email: userinfo.data.email!,
          },
        );

        const session = await this.sessionService.createSession({
          userId: user.id,
        });

        return { session };
      }
      case AuthProvider.facebook: {
        const facebook = new Facebook(
          decrypt(findProvider.clientId!, this.config.get('APP_SECRET')),
          decrypt(findProvider.clientSecret!, this.config.get('APP_SECRET')),
          `${this.config.get('API_URL')}/auth/providers/${AuthProvider.facebook}/callback`,
        );

        const token = await facebook.validateAuthorizationCode(code);
        console.log('token', token);
        const userinfo = await facebook.getUserinfo(token.access_token);
        console.log('userinfo', userinfo);

        const user = await this.authService.linkOrCreateUserWithProvider(
          AuthProvider.facebook,
          userinfo.id!,
          {
            name: userinfo.name,
            email: userinfo.email!,
          },
        );

        const session = await this.sessionService.createSession({
          userId: user.id,
        });

        return { session };
      }
    }
  }
}

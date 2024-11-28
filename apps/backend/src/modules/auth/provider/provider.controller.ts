import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseEnumPipe,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthProvider } from '@repo/database/index';
import { Request, Response } from 'express';
import { IEnvConfig, NODE_ENV_ENUM } from 'src/config/configuration';

import { ProviderService } from './provider.service';

@Controller({
  path: 'auth/providers',
})
export class ProviderController {
  constructor(
    private config: ConfigService<IEnvConfig, true>,
    private readonly providerService: ProviderService,
  ) {}

  @Get('/:provider/redirect')
  @HttpCode(200)
  async redirect(
    @Req() req: Request,
    @Res() res: Response,
    @Param('provider', new ParseEnumPipe(AuthProvider)) provider: AuthProvider,
  ) {
    try {
      const url = await this.providerService.redirect(provider);
      console.log(url);
      res.redirect(url);
    } catch (error) {
      res.redirect(`${this.config.get('FRONTEND_URL')}/auth/signin`);
    }
  }

  @Get('/:provider/callback')
  @HttpCode(200)
  async callback(
    @Req() req: Request,
    @Res() res: Response,
    @Param('provider', new ParseEnumPipe(AuthProvider)) provider: AuthProvider,
    @Query('code') code: string,
  ) {
    try {
      const { session } = await this.providerService.callback(provider, code);
      res
        .cookie(this.config.get('API_COOKIE_KEY'), session.token, {
          httpOnly: true,
          secure:
            this.config.get('NODE_ENV') === NODE_ENV_ENUM.production && true,
          sameSite: 'lax',
          path: '/',
        })
        .redirect(`${this.config.get('FRONTEND_URL')}/app/dashboard`);
    } catch (error) {
      console.log(error);
      res.redirect(
        `${this.config.get('FRONTEND_URL')}/auth/signin?error=unknown`,
      );
    }
  }
}

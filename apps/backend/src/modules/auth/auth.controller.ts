import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  PreconditionFailedException,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  signInSchema,
  signUpSchema,
  ISignUp,
  resetPasswordSchema,
  IResetPassword,
  signUpConfirmSchema,
  ISignUpConfirm,
  IForgotPassword,
  forgotPasswordSchema,
  ISignIn,
} from '@repo/api/index';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { IEnvConfig, NODE_ENV_ENUM } from 'src/config/configuration';

import { AuthService } from './auth.service';
import { AuthGuard } from '../../guards/auth.guard';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly config: ConfigService<IEnvConfig, true>,
    private readonly authService: AuthService,
  ) {}

  @Get('/me')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async me(@Req() req: Request) {
    try {
      return await this.authService.me(req.session!.userId);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/signin')
  @HttpCode(200)
  async signin(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(signInSchema)) body: ISignIn['payload'],
  ) {
    try {
      const { user, session } = await this.authService.signin(body);

      res
        .cookie(this.config.get('API_COOKIE_KEY'), session.token, {
          httpOnly: true,
          secure:
            this.config.get('NODE_ENV') === NODE_ENV_ENUM.production && true,
          sameSite: 'lax',
          expires: dayjs().add(1, 'month').toDate(),
          path: '/',
        })
        .json({ data: user, success: true });
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      if (error instanceof PreconditionFailedException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/signup')
  @HttpCode(200)
  async signup(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(signUpSchema)) body: ISignUp['payload'],
  ) {
    try {
      await this.authService.signup(body);
      res.json({
        success: true,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/signout')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async signout(@Req() req: Request, @Res() res: Response) {
    try {
      await this.authService.signout(req.session!.token);

      res.clearCookie(this.config.get('API_COOKIE_KEY')).json({
        success: true,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/confirm')
  @HttpCode(200)
  async confirm(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body(new YupValidationPipe(signUpConfirmSchema))
    body: ISignUpConfirm['payload'],
  ) {
    try {
      const { user, session } = await this.authService.confirm(body);
      res
        .cookie(this.config.get('API_COOKIE_KEY'), session.token, {
          httpOnly: true,
          secure:
            this.config.get('NODE_ENV') === NODE_ENV_ENUM.production && true,
          sameSite: 'lax',
          expires: dayjs().add(1, 'month').toDate(),
          path: '/',
        })
        .json({ data: user, success: true });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/forgot-password')
  @HttpCode(200)
  async forgotPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(forgotPasswordSchema))
    body: IForgotPassword['payload'],
  ) {
    try {
      await this.authService.forgotPassword(body);
      res.json({
        success: true,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/reset-password')
  @HttpCode(200)
  async resetPassword(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(resetPasswordSchema))
    body: IResetPassword['payload'],
  ) {
    try {
      await this.authService.resetPassword(body);
      res.json({
        success: true,
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

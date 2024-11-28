import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import {
  IUpdateOauthProviderById,
  updateOauthProviderByIdSchema,
} from '@repo/api/index';
import { Request } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { OauthProviderService } from './oauth-provider.service';

@Controller({
  path: 'oauth/providers',
  version: '1',
})
export class OauthProviderController {
  constructor(private readonly oauthProviderService: OauthProviderService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getOauthProviders(@Req() req: Request) {
    try {
      return await this.oauthProviderService.getOauthProviders(req.project!.id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getOauthProviderById(
    @Req() req: Request,
    @Param('id') id: string,
    @Query(
      'withCredentials',
      new DefaultValuePipe(false),
      new ParseBoolPipe({
        optional: true,
        exceptionFactory: () => new HttpErrorByCode[HttpStatus.BAD_REQUEST](),
      }),
    )
    withCredentials: boolean,
  ) {
    try {
      return await this.oauthProviderService.getOauthProviderById(
        req.project!.id,
        id,
        withCredentials,
      );
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @Post('/:id/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateOauthProviderById(
    @Body(new YupValidationPipe(updateOauthProviderByIdSchema))
    body: IUpdateOauthProviderById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.oauthProviderService.updateOauthProviderById(id, body);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/:id/credentials/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async updateOauthProviderCredentialById(
    @Body() body: any,
    @Param('id') id: string,
  ) {
    try {
      return await this.oauthProviderService.updateOauthProviderCredentialById(
        id,
        body,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }
}

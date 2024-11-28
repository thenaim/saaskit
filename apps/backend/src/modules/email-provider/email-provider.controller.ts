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
  ITestEmailProviderById,
  IUpdateEmailProviderById,
  testEmailProviderByIdSchema,
  updateEmailProviderByIdSchema,
} from '@repo/api/index';
import { Request } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { EmailProviderService } from './email-provider.service';

@Controller({
  path: 'email/providers',
  version: '1',
})
export class EmailProviderController {
  constructor(private readonly emailProviderService: EmailProviderService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getEmailProviders(@Req() req: Request) {
    try {
      return await this.emailProviderService.getEmailProviders(req.project!.id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getEmailProviderById(
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
      return await this.emailProviderService.getEmailProviderById(
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
  async updateEmailProviderById(
    @Body(new YupValidationPipe(updateEmailProviderByIdSchema))
    body: IUpdateEmailProviderById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.emailProviderService.updateEmailProviderById(id, body);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException();
    }
  }

  @Post('/:id/test')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async testEmailProviderById(
    @Body(new YupValidationPipe(testEmailProviderByIdSchema))
    body: ITestEmailProviderById['payload'],
    @Param('id') id: string,
  ) {
    try {
      return await this.emailProviderService.testEmailProviderById(id, body);
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
  async updateEmailProviderCredentialById(
    @Body() body: any,
    @Param('id') id: string,
  ) {
    try {
      return await this.emailProviderService.updateEmailProviderCredentialById(
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

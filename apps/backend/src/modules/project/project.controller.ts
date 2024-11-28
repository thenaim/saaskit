import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  IGetProject,
  IUpdateProjectAnalytics,
  IUpdateProjectAplication,
  IUpdateProjectEmail,
  IUpdateProjectPayment,
  IUpdateProjectReCaptcha,
  updateProjectAnalyticsSchema,
  updateProjectAplicationSchema,
  updateProjectEmailSchema,
  updateProjectPaymentSchema,
  updateProjectReCaptchaSchema,
} from '@repo/api/index';
import { Request, Response } from 'express';
import { YupValidationPipe } from 'src/common/pipes';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { ProjectService } from './project.service';

@Controller({
  path: 'project',
  version: '1',
})
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  getProject(
    @Req() req: Request,
    @Res() res: Response<IGetProject['response']>,
  ) {
    return this.projectService.getProject(req, res);
  }

  @Post('/application/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  updateProjectApplication(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(updateProjectAplicationSchema))
    body: IUpdateProjectAplication['payload'],
  ) {
    return this.projectService.updateProjectApplication(req, res, body);
  }

  @Post('/payment/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  updateProjectPayment(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(updateProjectPaymentSchema))
    body: IUpdateProjectPayment['payload'],
  ) {
    return this.projectService.updateProjectPayment(req, res, body);
  }

  @Post('/email/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  updateProjectEmail(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(updateProjectEmailSchema))
    body: IUpdateProjectEmail['payload'],
  ) {
    return this.projectService.updateProjectEmail(req, res, body);
  }

  @Post('/analytics/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  updateProjectAnalytics(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(updateProjectAnalyticsSchema))
    body: IUpdateProjectAnalytics['payload'],
  ) {
    return this.projectService.updateProjectAnalytics(req, res, body);
  }

  @Post('/recaptcha/update')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  updateProjectReCaptcha(
    @Req() req: Request,
    @Res() res: Response,
    @Body(new YupValidationPipe(updateProjectReCaptchaSchema))
    body: IUpdateProjectReCaptcha['payload'],
  ) {
    return this.projectService.updateProjectReCaptcha(req, res, body);
  }
}

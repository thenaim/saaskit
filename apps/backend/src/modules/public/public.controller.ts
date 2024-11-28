import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { PublicService } from './public.service';

@Controller({
  path: 'public',
  version: '1',
})
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/oauth-providers')
  @HttpCode(200)
  getProject(@Req() req: Request, @Res() res: Response) {
    return this.publicService.oauthProviders(req, res);
  }
}

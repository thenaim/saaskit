import { Controller, Get, HttpCode, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller({
  path: 'test',
  version: '1',
})
export class AppController {
  @Get('/')
  @HttpCode(200)
  test(@Req() req: Request, @Res() res: Response) {
    return res.json({ APP_SECRET: process.env.APP_SECRET });
  }
}

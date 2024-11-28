import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard, AuthAdminGuard } from 'src/guards';

import { UserService } from './user.service';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  @HttpCode(200)
  @UseGuards(AuthGuard, AuthAdminGuard)
  async getAdminUsersList() {
    try {
      return await this.userService.getAdminUsersList();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Post('/me')
  @HttpCode(200)
  async me() {
    try {
      return await this.userService.me();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

import { Module } from '@nestjs/common';

import { PaddleService } from './paddle.service';

@Module({
  providers: [PaddleService],
  exports: [PaddleService],
})
export class PaddleModule {}

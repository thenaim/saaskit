import { Global, Module } from '@nestjs/common';

import { SessionService } from './session.service';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

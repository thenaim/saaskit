import { Module } from '@nestjs/common';

import { EmailProviderController } from './email-provider.controller';
import { EmailProviderService } from './email-provider.service';

@Module({
  controllers: [EmailProviderController],
  providers: [EmailProviderService],
})
export class EmailProviderModule {}

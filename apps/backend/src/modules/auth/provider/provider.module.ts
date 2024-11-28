import { Module } from '@nestjs/common';

import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { AuthService } from '../auth.service';

@Module({
  controllers: [ProviderController],
  providers: [ProviderService, AuthService],
})
export class ProviderModule {}

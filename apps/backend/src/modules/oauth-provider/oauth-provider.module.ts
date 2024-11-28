import { Module } from '@nestjs/common';

import { OauthProviderController } from './oauth-provider.controller';
import { OauthProviderService } from './oauth-provider.service';

@Module({
  controllers: [OauthProviderController],
  providers: [OauthProviderService],
})
export class OauthProviderModule {}

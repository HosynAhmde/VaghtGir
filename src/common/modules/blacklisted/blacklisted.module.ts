import { Global, Module } from '@nestjs/common';

import { BlacklistedService } from './blacklisted.service';

@Global()
@Module({
  imports: [],
  providers: [BlacklistedService],
  exports: [BlacklistedService],
})
export class BlacklistedModule {}

import { Module } from '@nestjs/common';
import { PaginationService } from './service/pagination.service';


@Module({
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}

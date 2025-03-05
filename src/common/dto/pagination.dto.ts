import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';


export class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1) // negative number not allowed to pass into limit
  @Transform(({ value }) => Math.min(Math.floor(value ?? 10), 100))
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(1) // negative number not allowed to pass into skip
  @Transform(({ value }) => Math.floor(value ?? 1))
  page: number;

  @IsOptional()
  @IsNumber()
  @Min(0) // negative number not allowed to pass into skip
  @Transform(({ value, obj }) => {
    const limit = obj.limit ?? 10;
    return obj.page ? (obj.page - 1) * limit : Math.floor(value ?? 0);
  })
  skip: number;
}


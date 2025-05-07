import { toPlain } from '@Common/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class Serializer<T> {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;


  constructor(data?: Partial<T>) {
    if (data) Object.assign(this, toPlain(data));
  }
}

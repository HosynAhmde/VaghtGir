import { IsEnum, IsPhoneNumber, IsString } from 'class-validator';

import { Roles } from '@Common/constants';

import { ApiProperty } from '@nestjs/swagger';
import { CreateDto } from '@Common/dto/create.dto';
import { Phone } from '@Common/decorators';

export class CreateUserDto extends CreateDto<CreateUserDto> {

  @ApiProperty({ description: 'User phone number' })
  @Phone()
  phone: string;

  @ApiProperty({ description: 'User role', enum: Roles })
  @IsEnum(Roles)
  role: Roles;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsEnum, ValidateIf } from 'class-validator';
import { Roles } from '@Common/constants';
import { UpdateDto } from '@Common/dto/update.dto';
import { Phone } from '@Common/decorators';

export class UpdateUserDto extends UpdateDto<UpdateUserDto> {
  @ApiProperty({ description: 'User phone number', required: false })
  @Phone()
  @ValidateIf(o=> 'phone' in o)
  phone?: string;

  @ApiProperty({ description: 'User role', enum: Roles, required: false })
  @IsEnum(Roles)
  @ValidateIf(o=> 'role' in o)
  role?: Roles;
}

import { UpdateDto } from '@Common/dto';
import { Profile } from '../entity';
import { IsString, ValidateIf } from 'class-validator';

export class UpdateProfileDto extends UpdateDto<Profile> {
  @IsString()
  @ValidateIf(o=> 'firstName' in o)
  firstName?: string;

  @IsString()
  @ValidateIf(o=> 'lastName' in o)
  lastName?: string;

  @IsString()
  @ValidateIf(o=> 'avatar' in o)
  avatar?: string;
}

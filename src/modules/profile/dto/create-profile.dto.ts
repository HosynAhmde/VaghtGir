import { IsString, IsOptional } from 'class-validator';
import { CreateDto } from '@Common/dto';
import { Profile } from '../entity';

export class CreateProfileDto extends CreateDto<Profile> {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}

import { ConfigNamespace } from '@Common/configuration/config.constant';
import { Phone } from '@Common/decorators';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

import { Match } from '../decorators';

export class ForgetPasswordDto {
  @IsNotEmpty({ message: 'AUTH.MOBILE_REQUIRED' })
  @Phone()
  mobile: string;
}

const digits = ConfigNamespace.Otp.length;

export class VerifyForgetPasswordDto {
  @IsNotEmpty({ message: 'AUTH.MOBILE_REQUIRED' })
  @Phone()
  readonly mobile: string;

  @IsString({ message: 'AUTH.TOKEN_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'AUTH.TOKEN_REQUIRED' })
  @Length(digits, digits, { message: 'AUTH.TOKEN_MINLENGTH' })
  readonly token: string;

  @IsNotEmpty({ message: 'AUTH.PASSWORD_REQUIRED' })
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  readonly password: string;

  @Match('password')
  @MinLength(8)
  @MaxLength(20)
  readonly confirmPassword: string;
}

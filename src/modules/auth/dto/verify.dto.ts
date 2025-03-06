
import { ConfigNamespace } from '@Common/configuration/config.constant';
import { Phone } from '@Common/decorators';
import { IsNotEmpty, IsString, Length } from 'class-validator';

const digits = ConfigNamespace.Otp.length;

export class VerifyDto {
  @IsNotEmpty({ message: 'AUTH.MOBILE_REQUIRED' })
  @Phone()
  readonly phone: string;

  @IsString({ message: 'AUTH.TOKEN_MUST_BE_STRING' })
  @IsNotEmpty({ message: 'AUTH.TOKEN_REQUIRED' })
  // @Length(digits, digits, { message: 'AUTH.TOKEN_MINLENGTH' })
  readonly token: string;
}

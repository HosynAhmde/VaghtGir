import { Phone } from '@Common/decorators';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'AUTH.phone_REQUIRED' })
  @Phone()
  phone: string;
}

export class LoginWithPasswordDto extends LoginDto {
  @IsNotEmpty({ message: 'AUTH.MOBILE_REQUIRED' })
  @Phone()
  phone: string;

  @IsNotEmpty({ message: 'AUTH.PASSWORD_REQUIRED' })
  @IsString()
  password: string;
}

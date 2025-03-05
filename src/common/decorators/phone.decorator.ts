import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsPhoneNumber } from 'class-validator';
import phone from 'phone';

export const Phone = () =>
  applyDecorators(
    IsPhoneNumber('IR', { message: 'phone_invalid' }),
    Transform(({ value }) => {
      const { phoneNumber, isValid } = phone(value, { country: 'IR' });

      return isValid ? phoneNumber : false;
    }),
  );

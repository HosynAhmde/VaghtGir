import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDoc {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'URL of the user\'s avatar image',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar?: string;

  @ApiProperty({
    description: 'User\'s biography or description',
    example: 'Software developer with 5 years of experience',
    required: false,
  })
  bio?: string;

  @ApiProperty({
    description: 'User\'s phone number',
    example: '+1234567890',
    required: false,
  })
  phoneNumber?: string;
}

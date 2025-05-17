import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entity/user.entity';

export class ProfileDoc {
  @ApiProperty({
    description: 'Unique identifier of the profile',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    required: false,
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    required: false,
  })
  lastName: string;

  @ApiProperty({
    description: 'URL of the user\'s avatar image',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  avatar: string;

  @ApiProperty({
    description: 'User\'s biography or description',
    example: 'Software developer with 5 years of experience',
    required: false,
  })
  bio: string;

  @ApiProperty({
    description: 'User\'s phone number',
    example: '+1234567890',
    required: false,
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Associated user',
    type: () => User,
  })
  user: User;

  @ApiProperty({
    description: 'Date when the profile was created',
    example: '2024-03-20T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the profile was last updated',
    example: '2024-03-20T12:00:00Z',
  })
  updatedAt: Date;
}

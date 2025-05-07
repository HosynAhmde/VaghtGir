import { UserSerializer } from '@Modules/user/serializers/user.serializer';

import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AuthSerializer {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken?: string;

  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;

  @Expose()
  expiration: number;

  constructor(data?: Partial<AuthSerializer>) {
    if (data) Object.assign(this, data);
  }
}

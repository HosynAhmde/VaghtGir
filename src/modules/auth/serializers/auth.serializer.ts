import { toPlain } from '@Common/utils';
import { UserEntity } from '@Modules/user/entity';
import { UserSerializer } from '@Modules/user/serializers';
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

  static build(data: {
    user: UserEntity;
    accessToken: string;
    refreshToken: string;
  }): AuthSerializer {
    return new AuthSerializer(data);
  }

  constructor(data: any) {
    Object.assign(this, toPlain(data));
  }
}

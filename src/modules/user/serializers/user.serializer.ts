
import { Exclude, Expose } from 'class-transformer';


import { UserEntity } from '../entity/user.entity';
import { Serializer } from '@Common/serializers';

@Exclude()
export class UserSerializer extends Serializer<UserSerializer> {

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  static build(data: UserEntity): UserSerializer {
    return new UserSerializer(data);
  }
}

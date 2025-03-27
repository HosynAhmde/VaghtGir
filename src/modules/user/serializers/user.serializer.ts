
import { Exclude, Expose } from 'class-transformer';


import { User } from '../entity/user.entity';
import { Serializer } from '@Common/serializers';

@Exclude()
export class UserSerializer extends Serializer<UserSerializer> {

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  static build(data: User): UserSerializer {
    return new UserSerializer(data);
  }
}

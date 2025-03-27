import type { ItemsWithMetadata } from '@Common/interfaces';
import { Metadata } from '@Common/interfaces';
import { Exclude, Expose, Type } from 'class-transformer';

import { UserSerializer } from './user.serializer';
import { User } from '../entity/user.entity';

@Exclude()
export class UsersSerializer {
  @Expose()
  @Type(() => UserSerializer)
  items: UserSerializer[];

  @Expose()
  metadata: Metadata;

  static build({
    items,
    metadata,
  }: ItemsWithMetadata<User>): UsersSerializer {
    return new UsersSerializer({
      items: items.map(item => UserSerializer.build(item)),
      metadata,
    });
  }

  constructor(data?: UsersSerializer) {
    if (data) Object.assign(this, data);
  }
}

import { UserSerializer } from './user.serializer';
import { Exclude, Expose, Type } from 'class-transformer';
import { ItemsWithMetadata, Metadata } from '@Common/interfaces';
import { User } from '../entity';
import { IPaginationResponse } from '@Common/modules/pagination/interface';

@Exclude()
export class UsersSerializer {
  @Expose()
  @Type(() => UserSerializer)
  items: UserSerializer[];

  @Expose()
  meta: IPaginationResponse<User>['meta'];

  static build({
    items,
    meta,
  }: IPaginationResponse<User>): UsersSerializer {
    return new UsersSerializer({
      items: items.map(item => UserSerializer.build(item)),
      meta,
    });
  }

  constructor(data?: UsersSerializer) {
    if (data) Object.assign(this, data);
  }
}
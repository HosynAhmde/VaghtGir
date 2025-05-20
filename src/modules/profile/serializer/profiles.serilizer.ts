import { Exclude, Expose, Type } from 'class-transformer';
import { IPaginationResponse } from '@Common/modules/pagination/interface';
import { ProfileSerializer } from './profile.serializer';
import { Profile } from '../entity';

@Exclude()
export class ProfilesSerializer {
  @Expose()
  @Type(() => ProfileSerializer)
  items: ProfileSerializer[];

  @Expose()
  meta: IPaginationResponse<Profile>['meta'];

  static build({
    items,
    meta,
  }: IPaginationResponse<Profile>): ProfilesSerializer {
    return new ProfilesSerializer({
      items: items.map(item => ProfileSerializer.build(item)),
      meta,
    });
  }

  constructor(data?: ProfilesSerializer) {
    if (data) Object.assign(this, data);
  }
}
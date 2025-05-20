import { Exclude,Expose } from "class-transformer";
import { Serializer } from "@Common/serializers";
import { Profile } from "../entity/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class ProfileSerializer extends Serializer<Profile> {
  @Expose()
  @ApiProperty({ description: 'The ID of the profile' })
  firstName:string;

  @Expose()
  @ApiProperty({ description: 'The ID of the profile' })
  lastName:string;

  @Expose()
  @ApiProperty({ description: 'The ID of the profile' })
  avatar:string;

  static build(data: Profile): ProfileSerializer {
    return new ProfileSerializer(data);
  }
}

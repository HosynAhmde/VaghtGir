import { Roles } from "@Common/constants";
import { Exclude, Expose } from "class-transformer";
import { User } from "../entity";
import { Serializer } from "@Common/serializers";
import { ApiProperty } from "@nestjs/swagger";
@Exclude()
export class UserSerializer extends Serializer<User> {
  @Expose()
  @ApiProperty({ description: 'The phone number of the user' })
  phone: string;

  @Expose()
  @ApiProperty({enum:Roles, description: 'The role of the user' })
  role: Roles;

  static build(data: User): UserSerializer {
    return new UserSerializer(data);
  }
}

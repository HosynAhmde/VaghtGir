import { IsEnum } from "class-validator";

import { Roles } from "@Common/constants";
import { IsNotEmpty } from "class-validator";

export class RoleDto {
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;
}

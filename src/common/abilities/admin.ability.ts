import { Roles } from "@Common/constants";
import { Ability } from "abacl";

export const AdminAbility:Ability<Roles>[]=[
    {
        subject: Roles.Admin,
        action: 'any',
        object: 'all',
      },
]
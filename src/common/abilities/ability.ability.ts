import { Roles } from "@Common/constants";
import { Ability } from "abacl";
import { UserAbility } from "./user.ability";
import { AdminAbility } from "./admin.ability";

export const abilities:Ability<Roles>[] = [
    ...UserAbility,
    ...AdminAbility
    
]
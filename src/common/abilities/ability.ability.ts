import { Roles } from "@Common/constants";
import { Ability } from "abacl";
import { UserAbility } from "./user.ability";

export const abilities:Ability<Roles>[] = [
    ...UserAbility
]
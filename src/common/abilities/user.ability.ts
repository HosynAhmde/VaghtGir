import { Resource, Roles } from "@Common/constants";
import { Ability } from "abacl";

export const UserAbility :Ability<Roles>[]=[
    {
        subject:Roles.User,
        action:'create:own',
        object:Resource.User
    },
    {
        subject:Roles.User,
        action:'read:own',
        object:Resource.User
    },
    {
        subject:Roles.User,
        action:'update:own',
        object:Resource.User
    }
]
   

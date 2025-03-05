import { Roles } from "@Common/constants";
import { IsString } from "class-validator";

export class UserDto{
    
    @IsString()
    firstName:string

    @IsString()
    lastName:string

    @IsString()
    phone:string

    role:Roles
}
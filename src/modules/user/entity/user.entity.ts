import { Column, Entity } from "typeorm";
import { AbstractEntity } from "@Common/entity/abstract.entity";
import { Roles } from "@Common/constants";

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column({type:'varchar',unique:true})
  phone: string;

  @Column({type:'varchar',enum:Roles})
  role: Roles;

}
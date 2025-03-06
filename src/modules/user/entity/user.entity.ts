import { Roles } from "@Common/constants";
import { AbstractEntity } from "@Common/entity";
import { AfterInsert, BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class UserEntity  extends AbstractEntity<UserEntity> {

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 14 ,unique:true})
  phone: string;

  @Column({ type: 'varchar', length: 10, default:Roles.User})
  role: string;

}
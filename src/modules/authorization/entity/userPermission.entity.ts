import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";

import { Column } from "typeorm";
import { User } from "src/modules/user/entity/user.entity";
import { Permission } from "./permission.entity";

@Entity()
export class UserPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userPermissions)
  user: User;

  @ManyToOne(() => Permission)
  permission: Permission;

  @Column({type:'boolean',nullable:true})
  isAllowed: boolean;
}
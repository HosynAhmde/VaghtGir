import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Column } from "typeorm";
import { RolePermission } from "./rolePermission.entity";
import { Roles } from "@Common/constants";
import { User } from "@Modules/user/entity/user.entity";
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar',length:255})
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];
}
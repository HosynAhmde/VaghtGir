import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Column } from "typeorm";
import { RolePermission } from "./rolePermission.entity";
import { Roles } from "@Common/constants";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'enum',enum:Roles})
  role: Roles;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];
}
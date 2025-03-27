import { ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Entity } from "typeorm";
import { Role } from "./role.entity";
import { Permission } from "./permission.entity";

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Role, role => role.rolePermissions)
  role: Role;

  @ManyToOne(() => Permission)
  permission: Permission;
}
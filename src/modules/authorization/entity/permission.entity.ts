import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";
import { UserPermission } from "./userPermission.entity";
import { RolePermission } from "./rolePermission.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar',length:255})
  name: string;

  @Column({type:'varchar',length:255})
  description: string;

  @OneToMany(() => RolePermission, (rp) => rp.permission)
  rolePermissions: RolePermission[];

  @OneToMany(() => UserPermission, (up) => up.permission)
  userPermissions: UserPermission[];

}
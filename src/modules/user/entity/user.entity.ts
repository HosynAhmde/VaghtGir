import { Roles } from "@Common/constants";
import { AbstractEntity } from "@Common/entity";
import { Role } from "@Modules/authorization/entity/role.entity";
import { UserPermission } from "@Modules/authorization/entity/userPermission.entity";
import { AfterInsert, BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class User  extends AbstractEntity<User> {

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 14 ,unique:true})
  phone: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => UserPermission, userPermission => userPermission.user)
  userPermissions: UserPermission[];

}
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "@Common/entity/abstract.entity";
import { Roles } from "@Common/constants";
import { Profile } from "@Modules/profile/entity";

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column({type:'varchar',unique:true})
  phone: string;

  @Column({type:'varchar',enum:Roles})
  role: Roles;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;

}
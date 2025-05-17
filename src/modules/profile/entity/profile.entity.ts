import { Entity, Column, OneToOne } from 'typeorm';
import { AbstractEntity } from '@Common/entity';
import { User } from '@Modules/user/entity/user.entity';

@Entity('profiles')
export class Profile extends AbstractEntity<Profile> {
  @Column({ nullable: true, type: 'varchar', length: 100})
  firstName: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  lastName: string;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  avatar: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}

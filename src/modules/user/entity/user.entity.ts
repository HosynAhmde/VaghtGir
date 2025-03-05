import { AbstractEntity } from "@Common/entity";
import { AfterInsert, BeforeInsert, Column, Entity } from "typeorm";

@Entity()
export class UserEntity  extends AbstractEntity<UserEntity> {

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 14 })
  phone: string;

  @Column({ type: 'varchar', length: 10 ,nullable:true})
  role: string;

}
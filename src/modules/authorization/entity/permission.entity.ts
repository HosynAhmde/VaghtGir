import { Entity, PrimaryGeneratedColumn } from "typeorm";

import { Column } from "typeorm";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
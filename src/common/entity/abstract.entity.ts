import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:'varchar',nullable:true})
  createdBy:string

  @CreateDateColumn()
  createdAt:Date

  @Column({type:'varchar',nullable:true})
  updatedBy:string

  @UpdateDateColumn({nullable:true})
  updatedAt:Date

  @Column({type:'varchar',nullable:true})
  deletedBy:string

  @DeleteDateColumn()
  deletedAt:Date

  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
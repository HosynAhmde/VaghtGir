import { AbstractEntity } from "@Common/entity";
import { Column, Entity } from "typeorm";
import { IResult } from "ua-parser-js";

@Entity({name:'sessions'})
export class Session extends AbstractEntity<Session> {
  @Column({type:'json'})
  agent?: IResult;

  @Column({type:'varchar'})
  ip?: string;
}


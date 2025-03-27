import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entity/session.schema';
import type { IResult } from 'ua-parser-js';

@Injectable()
export class SessionRepository extends Repository<Session> {
  constructor(@InjectRepository(Session) private readonly sessionRepository: Repository<Session>) {
    super(sessionRepository.target, sessionRepository.manager, sessionRepository.queryRunner);
  }

  async createSession(ip:string,agent:IResult): Promise<Session> {
    const newSession = await this.sessionRepository.create({
      ip,
      agent,
    });
    return await this.sessionRepository.save(newSession);
  }

  async findSessionById(id: string): Promise<Session> {
    return await this.sessionRepository.findOneBy({ id });
  }

  async updateSession(id: string, ): Promise<void> {
    await this.sessionRepository.update(id, {deletedAt: new Date()});
  }
}

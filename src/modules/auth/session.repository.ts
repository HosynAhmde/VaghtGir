import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './entity';
import type { IResult } from 'ua-parser-js';

@Injectable()
export class SessionRepository extends Repository<SessionEntity> {
  constructor(@InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>) {
    super(sessionRepository.target, sessionRepository.manager, sessionRepository.queryRunner);
  }

  async createSession(ip:string,agent:IResult): Promise<SessionEntity> {
    const newSession = await this.sessionRepository.create({
      ip,
      agent,
    });
    return await this.sessionRepository.save(newSession);
  }
  
  async findSessionById(id: string): Promise<SessionEntity> {
    return await this.sessionRepository.findOneBy({ id });
  }

  async updateSession(id: string, ): Promise<void> {
    await this.sessionRepository.update(id, {deletedAt: new Date()});
  }
}

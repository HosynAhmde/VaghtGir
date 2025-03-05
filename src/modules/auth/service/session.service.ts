import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../session.repository'
import { SessionEntity } from '../entity';
import { IResult } from 'ua-parser-js';

@Injectable()
export class SessionService  {
  constructor(readonly repository: SessionRepository) {}

  async createSession(ip: string, agent: IResult): Promise<SessionEntity> {
    return this.repository.createSession(ip, agent);
  }

  async findSessionById(id: string): Promise<SessionEntity> {
    return this.repository.findSessionById(id);
  }

  async updateSession(id: string): Promise<void> {
    return this.repository.updateSession(id);
  }
}

import { Injectable } from '@nestjs/common';
import { SessionRepository } from '../session.repository'
import { Session } from '../entity/session.schema';
import { IResult } from 'ua-parser-js';

@Injectable()
export class SessionService  {
  constructor(readonly repository: SessionRepository) {}

  async createSession(ip: string, agent: IResult): Promise<Session> {
    return this.repository.createSession(ip, agent);
  }

  async findSessionById(id: string): Promise<Session> {
    return this.repository.findSessionById(id);
  }

  async updateSession(id: string): Promise<void> {
    return this.repository.updateSession(id);
  }
}

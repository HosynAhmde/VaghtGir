import { Inject, Injectable } from '@nestjs/common';
import { Redis, RedisOptions } from 'ioredis';

export const REDIS_KEY_OPTIONS = Symbol('REDIS_KEY_OPTIONS');

@Injectable()
export class RedisService extends Redis {
  constructor(@Inject(REDIS_KEY_OPTIONS) options: RedisOptions) {
    super(options);
  }
}

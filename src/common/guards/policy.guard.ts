import { abilities } from '@Common/abilities/ability.ability';
import {
  CHECK_POLICY_KEY,
  IS_PUBLIC_KEY,
  RESOURCE_KEY,
  Roles,
} from '@Common/constants';
import type { AppRequest } from '@Common/modules/request';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import AccessControl from 'abacl';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctxClass = context.getClass();
    const ctxHandler = context.getHandler();
    const request = context.switchToHttp().getRequest<AppRequest>();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctxClass,
      ctxHandler,
    ]);

    if (isPublic) return !!request.token;

    if (!request.token)
      throw new Error(
        'Policy guard must be used with @UseGuard(AuthGuard) decorator',
      );

    const resource = this.reflector.getAllAndOverride(RESOURCE_KEY, [
      ctxHandler,
      ctxClass,
    ]);

    if (!resource)
      throw new Error('Resource must be set with @SetResource decorator');

    const action = this.reflector.getAllAndOverride(CHECK_POLICY_KEY, [
      ctxHandler,
      ctxClass,
    ]);

    const ac = new AccessControl<Roles>(abilities);

    const permission = ac.can(request.token.roles, action, resource);

    if (!permission.granted) return false;

    request.permission = permission;

    return !!request.permission;
  }
}

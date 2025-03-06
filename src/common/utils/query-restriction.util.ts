
import { TWhereQuery } from '@Common/decorators';
import { JwtToken } from '@Modules/auth/interface';
import { BadRequestException } from '@nestjs/common';

import type { Permission } from 'abacl';

// eslint-disable-next-line complexity
export const queryRestriction = (
  q: any,
  permission: Permission, // from request.permission
  token: JwtToken,
) => {
  // TODO: need to checkout new version documentation
  if (permission.hasAll() && permission.hasAny()) return q;

  const query = q ?? {};

  if (permission.has('own')) {
    query.createdBy = token.sub;
  }

  if (permission.has('shared')) {
    query.shares = token.sub;
  }


  if (!query.createdBy && !query.shares)
    throw new BadRequestException('grant.not_allowed');

  const OR = [];

  if (query.createdBy) OR.push({ createdBy: query.createdBy });
  if (query.shares) OR.push({ shares: query.shares });

  if (OR.length > 0) {
    delete query.createdBy;
    delete query.shares;
  }

  const AND = [];

  if (OR.length > 1) {
    AND.push({ OR });
  } else {
    AND.push(OR[0]);
  }

  query.AND = AND;


  return AND as TWhereQuery;
};

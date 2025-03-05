
// import type { JwtToken } from '@Modules/auth/interfaces';
import { TWhereQuery } from '@Common/decorators';
import { Pagination } from '@Common/interfaces';
import { JwtToken } from '@Modules/auth/interface';
import { UserEntity } from '@Modules/user/entity';

import type { Permission } from 'abacl';
import type { Request } from 'express';
import type { IResult } from 'ua-parser-js';

export interface File extends Express.Multer.File {}

export interface AppRequest extends Request {
  token?: JwtToken;
  
  refreshToken?: JwtToken;
  user?: UserEntity;

  whereQuery: TWhereQuery;

  paginationFilter:Pagination
 

  ___userAgent: IResult;

  files: File[];

  permission?: Permission;

  id: string;

  clientIpAddress?: string;
}

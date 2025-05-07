import { ApiQuery, ApiResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, refs, ApiBearerAuth } from "@nestjs/swagger";

import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserSerializer } from "../serializers";
import { ApiPaginatedResponse } from "@Common/decorators";
import { PaginationDto } from "@Common/modules/pagination/dto/pagination.dto";

  export const ApiGetUsers = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'UsersQuery',
      description: 'react hook => useUsersQuery',
    }),
    ApiQuery({
      type: PaginationDto,
      schema: {
        oneOf: refs(PaginationDto),
      },
    }),
    ApiPaginatedResponse(UserSerializer),
    ApiUnauthorizedResponse({
     schema: {
      example: {
        statusCode: 401,
        message: 'AUTH.TOKEN_REQUIRED',
      },
     },

    }),
    ApiForbiddenResponse({
      description: 'Forbidden',
    }),
  );
};
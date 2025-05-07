import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiBearerAuth } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export const ApiDeleteUser = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'DeleteUser',
      description: 'Delete user by ID',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'User ID',
    }),
    ApiOkResponse({
      description: 'The user has been successfully deleted',
    }),
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

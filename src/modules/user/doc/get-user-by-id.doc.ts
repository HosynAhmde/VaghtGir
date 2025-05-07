import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, refs, ApiBearerAuth } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserSerializer } from "../serializers";

export const ApiGetUserById = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'GetUserById',
      description: 'Get user by ID',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'User ID',
    }),
    ApiOkResponse({
      type: UserSerializer,
      description: 'The user has been successfully retrieved',
      schema: {
        oneOf: refs(UserSerializer),
      },
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

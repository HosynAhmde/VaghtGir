import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, ApiBody, ApiCreatedResponse, refs, ApiBearerAuth } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserSerializer } from "../serializers";
import { UpdateUserDto } from "../dto";
export const ApiUpdateUser = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'UpdateUser',
      description: 'Update user by ID',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'User ID',
    }),
    ApiBody({
      type: UpdateUserDto,
      schema: {
        oneOf: refs(UpdateUserDto),
      },
    }),
    ApiOkResponse({
      type: UserSerializer,
      description: 'The user has been successfully updated',
    }),
    ApiCreatedResponse({
      type: UserSerializer,
      description: 'The user has been successfully updated',
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

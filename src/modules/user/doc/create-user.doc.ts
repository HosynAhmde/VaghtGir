import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiCreatedResponse, ApiBody, refs, ApiBearerAuth } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserSerializer } from "../serializers";
import { CreateUserDto } from "../dto";
export const ApiCreateUser = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'CreateUserQuery',
      description: 'react hook => useCreateUserQuery',
    }),
    ApiBody({
      type: CreateUserDto,
      schema: {
        oneOf: refs(CreateUserDto),
      },
    }),
    ApiCreatedResponse({
      type: UserSerializer,
      description: 'The user has been successfully created',
      schema: {
        oneOf: refs(UserSerializer),
      }
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

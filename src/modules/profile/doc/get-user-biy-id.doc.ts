import { ApiUnauthorizedResponse, ApiForbiddenResponse, ApiOkResponse, ApiParam, refs, ApiBearerAuth } from "@nestjs/swagger";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { ProfileSerializer } from "../serializer/profile.serializer";


export const ApiGetProfileById = () => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      operationId: 'GetProfileById',
      description: 'Get profile by ID',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      description: 'User ID',
    }),
    ApiOkResponse({
      type: ProfileSerializer,
      description: 'The profile has been successfully retrieved',
      schema: {
        oneOf: refs(ProfileSerializer),
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

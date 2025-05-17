import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileDoc } from './profile.doc';

export const ProfileControllerDoc = {
  tags: () => ApiTags('profiles'),
  bearerAuth: () => ApiBearerAuth(),
  create: {
    operation: () => ApiOperation({ summary: 'Create a new profile' }),
    response: {
      success: () => ApiResponse({
        status: 201,
        description: 'The profile has been successfully created.',
        type: ProfileDoc,
      }),
      badRequest: () => ApiResponse({ status: 400, description: 'Bad Request.' }),
      unauthorized: () => ApiResponse({ status: 401, description: 'Unauthorized.' }),
    },
  },
  findOne: {
    operation: () => ApiOperation({ summary: 'Get current user profile' }),
    response: {
      success: () => ApiResponse({
        status: 200,
        description: 'Returns the current user\'s profile.',
        type: ProfileDoc,
      }),
      unauthorized: () => ApiResponse({ status: 401, description: 'Unauthorized.' }),
      notFound: () => ApiResponse({ status: 404, description: 'Profile not found.' }),
    },
  },
  findById: {
    operation: () => ApiOperation({ summary: 'Get profile by ID' }),
    response: {
      success: () => ApiResponse({
        status: 200,
        description: 'Returns the profile with the specified ID.',
        type: ProfileDoc,
      }),
      unauthorized: () => ApiResponse({ status: 401, description: 'Unauthorized.' }),
      notFound: () => ApiResponse({ status: 404, description: 'Profile not found.' }),
    },
  },
  update: {
    operation: () => ApiOperation({ summary: 'Update profile' }),
    response: {
      success: () => ApiResponse({
        status: 200,
        description: 'The profile has been successfully updated.',
        type: ProfileDoc,
      }),
      badRequest: () => ApiResponse({ status: 400, description: 'Bad Request.' }),
      unauthorized: () => ApiResponse({ status: 401, description: 'Unauthorized.' }),
      notFound: () => ApiResponse({ status: 404, description: 'Profile not found.' }),
    },
  },
  remove: {
    operation: () => ApiOperation({ summary: 'Delete profile' }),
    response: {
      success: () => ApiResponse({
        status: 200,
        description: 'The profile has been successfully deleted.',
      }),
      unauthorized: () => ApiResponse({ status: 401, description: 'Unauthorized.' }),
      notFound: () => ApiResponse({ status: 404, description: 'Profile not found.' }),
    },
  },
};

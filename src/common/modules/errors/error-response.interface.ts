import type { ValidationError } from '@nestjs/common';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: string;
  errors?: ValidationError[];
  path?: string;
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../constants/error-code.constant';

export const buildHttpError = (error_code: ErrorCode, status: HttpStatus) => {
  return new HttpException({ error_code }, status);
};

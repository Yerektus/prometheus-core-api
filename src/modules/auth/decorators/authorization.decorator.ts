import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from '../guards/auth.guard';

export const Authorization = () => {
  return applyDecorators(UseGuards(AuthJwtGuard));
};

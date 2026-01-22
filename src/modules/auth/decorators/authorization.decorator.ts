import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthJwtGuard } from '../guards/auth.guard';
import { Roles } from './roles.decator';
import { RolesGuard } from '../guards/roles.guard';

export const Authorization = (...roles: string[]) => {
  return applyDecorators(Roles(roles), UseGuards(AuthJwtGuard, RolesGuard));
};

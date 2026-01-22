import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decator';
import { Request } from 'express';
import { UserEntity } from 'src/common/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return false;
    }

    const request = context.switchToHttp().getRequest<Request>();

    const user = request.user as UserEntity;
    if (!user?.roles) {
      return false;
    }

    return user.roles.some((role) => requiredRoles.includes(role.name));
  }
}

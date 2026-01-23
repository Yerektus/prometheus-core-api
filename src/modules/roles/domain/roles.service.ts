import { HttpStatus, Injectable } from '@nestjs/common';
import { RolesRepository } from '../data/roles.repository';
import { CreateRoleDto } from '../dto/create-role.dto';
import { buildHttpError } from 'src/common/utils/build-http-error';
import { ErrorCode } from 'src/common/constants/error-code.constant';
import { RoleEntity } from 'src/common/entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async createRole(payload: CreateRoleDto): Promise<RoleEntity> {
    const role = await this.rolesRepository.getRoleByName(payload.name);

    if (role) {
      throw buildHttpError(ErrorCode.RoleAlreadyExist, HttpStatus.BAD_REQUEST);
    }

    return this.rolesRepository.insertAndGetRole(payload);
  }
}

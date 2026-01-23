import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDao } from 'src/common/dao/role.dao';
import { RoleEntity } from 'src/common/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(RoleDao)
    private readonly rolesRepository: Repository<RoleDao>,
  ) {}

  insertAndGetRole(payload: CreateRoleDto): Promise<RoleEntity> {
    return this.rolesRepository.save({
      id: uuidv4(),
      name: payload.name,
      description: payload.description,
    });
  }

  getRoleByName(name: string): Promise<RoleEntity | null> {
    return this.rolesRepository.findOne({
      where: {
        name: name,
      },
    });
  }
}

import { Module } from '@nestjs/common';
import { RoleRosource } from './presenter/resources/role.resoucre';

@Module({
  providers: [RoleRosource],
  exports: [RoleRosource],
})
export class RolesModule {}

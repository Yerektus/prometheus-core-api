import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetRoleIdParam {
  @IsUUID()
  @IsNotEmpty()
  role_id: string;
}

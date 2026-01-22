import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserIdParam {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;
}

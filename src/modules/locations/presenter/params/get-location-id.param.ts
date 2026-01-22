import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetLocationIdParam {
  @IsUUID()
  @IsNotEmpty()
  location_id: string;
}

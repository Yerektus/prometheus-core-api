import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationBody {
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  floor?: string;

  @IsString()
  room?: string;
}

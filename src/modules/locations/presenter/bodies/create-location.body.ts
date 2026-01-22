import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateLocationBody {
  @IsUUID()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  country: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  city: string;

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsString()
  @IsOptional()
  room?: string;
}

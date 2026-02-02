import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateLocationAndFireSensorBody {
  @IsUUID()
  @MinLength(3)
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
  flat?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  serial_number?: string | null;

  @IsString()
  @IsOptional()
  @MinLength(3)
  model?: string | null;
}

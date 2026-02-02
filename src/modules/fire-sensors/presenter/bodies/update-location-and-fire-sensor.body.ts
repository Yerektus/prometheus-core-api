import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class UpdateLocationAndFireSensorBody {
  @IsUUID()
  @IsNotEmpty()
  owner_id: string;

  @IsUUID()
  @IsNotEmpty()
  location_id: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  country?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  city?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  floor?: string;

  @IsString()
  @IsOptional()
  flat?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  serial_number?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  model?: string;
}

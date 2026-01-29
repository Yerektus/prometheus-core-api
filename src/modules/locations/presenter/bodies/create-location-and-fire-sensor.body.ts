import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateLocationAndFireSensorBody {
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

  @IsString()
  @IsOptional()
  @MinLength(3)
  serial_number?: string | null;

  @IsString()
  @IsOptional()
  @MinLength(3)
  model?: string | null;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

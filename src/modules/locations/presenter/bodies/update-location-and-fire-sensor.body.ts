import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLocationAndFireSensorBody {
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
  @IsNotEmpty()
  floor: string;

  @IsString()
  @IsNotEmpty()
  flat: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  serial_number: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  model: string;
}

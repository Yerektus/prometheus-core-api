import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateLocationBody {
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
  floor?: string | null;

  @IsString()
  @IsOptional()
  room?: string | null;
}

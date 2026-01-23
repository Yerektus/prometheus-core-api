import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateRoleBody {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(32)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  description?: string;
}

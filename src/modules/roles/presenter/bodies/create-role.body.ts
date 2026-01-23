import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleBody {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  description: string;
}

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetFullnameQuery {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  last_name: string;
}

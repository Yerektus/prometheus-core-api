import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetSensorReadingsPaginationQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(3)
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;
}

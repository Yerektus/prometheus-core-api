import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetSensorReadingIdParam {
  @IsUUID()
  @IsNotEmpty()
  sensor_reading_id: string;
}

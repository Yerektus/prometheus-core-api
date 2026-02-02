import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetFireSensorIdParam {
  @IsUUID()
  @IsNotEmpty()
  fire_sensor_id: string;
}

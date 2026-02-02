import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateSensorReadingBody {
  @IsUUID()
  @IsNotEmpty()
  fire_sensor_id: string;

  @IsNumber()
  @IsNotEmpty()
  temperature_c: number;

  @IsNumber()
  @IsNotEmpty()
  humidity_pct: number;

  @IsNumber()
  @IsNotEmpty()
  gas_ppm: number;
}

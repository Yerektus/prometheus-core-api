export class CreateLocationAndFireSensorDto {
  country: string;
  city: string;
  address: string;
  floor?: string;
  flat?: string;
  serialNumber?: string | null;
  model?: string | null;
  isActive?: boolean;
}

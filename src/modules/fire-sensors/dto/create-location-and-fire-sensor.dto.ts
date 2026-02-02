export class CreateLocationAndFireSensorDto {
  ownerId: string;
  country: string;
  city: string;
  address: string;
  floor?: string;
  flat?: string;
  serialNumber?: string | null;
  model?: string | null;
}

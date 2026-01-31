export class CreateLocationDto {
  owner_id: string;
  country: string;
  city: string;
  address: string;
  floor?: string;
  flat?: string;
}

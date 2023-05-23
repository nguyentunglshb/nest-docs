import { IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsString()
  fullName: string;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;
}

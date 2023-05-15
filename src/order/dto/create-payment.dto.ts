import { IsString } from 'class-validator';

export class CreatepaymentDto {
  @IsString()
  amount: string;

  @IsString()
  bankCode: string;

  @IsString()
  language: string;
}

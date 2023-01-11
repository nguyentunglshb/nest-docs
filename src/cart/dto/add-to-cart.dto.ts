import { IsNumber } from 'class-validator';

export class AddToCardDto {
  _id: any;

  @IsNumber()
  quantity: number;
}

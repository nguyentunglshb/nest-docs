import { IsArray, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  //   @IsString()
  //   headImageUrl?: string;

  //   @IsArray()
  //   imageUrls?: string[];

  @IsString()
  description?: string;

  @IsString()
  content?: string;

  @IsString()
  originPrice?: string;

  @IsString()
  currentPrice?: string;

  @IsString()
  currency?: string;

  @IsArray()
  tags?: string[];
}

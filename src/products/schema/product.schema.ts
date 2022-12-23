import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  EnumCurrency,
  EnumProductStatus,
} from '../interface/product.interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop({
    default: EnumProductStatus.ACTIVE,
  })
  status: EnumProductStatus;

  @Prop()
  createdAt: string;

  @Prop({
    default: '',
  })
  headImageUrl: string;

  @Prop()
  imageUrls: string[];

  @Prop()
  description: string;

  @Prop()
  content: string;

  @Prop()
  originPrice: number;

  @Prop()
  currentPrice: number;

  @Prop({
    default: EnumCurrency.VND,
  })
  currency: EnumCurrency;

  @Prop()
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

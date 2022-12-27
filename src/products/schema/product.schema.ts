import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  EnumCurrency,
  EnumProductStatus,
} from '../interface/product.interface';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    required: true,
  })
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

  @Prop({
    required: false,
    default: [],
  })
  imageUrls: string[];

  @Prop({
    required: false,
    default: '',
  })
  description: string;

  @Prop({
    required: false,
    default: '',
  })
  content: string;

  @Prop({
    required: false,
    default: '',
  })
  originPrice: number;

  @Prop({
    required: false,
    default: '',
  })
  currentPrice: number;

  @Prop({
    default: EnumCurrency.VND,
  })
  currency: EnumCurrency;

  @Prop({
    required: false,
    default: [],
  })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

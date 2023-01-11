import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'Product',
  })
  productId: string;

  @Prop()
  name: string;

  @Prop()
  quantity: number;

  @Prop()
  price: number;

  @Prop()
  subTotalPrice: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

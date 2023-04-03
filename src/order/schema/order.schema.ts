import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({
    required: true,
  })
  fullName: string;

  @Prop({
    required: true,
  })
  address: string;

  @Prop({
    required: true,
  })
  city: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  items: Array<any>;

  @Prop({
    required: true,
  })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ProductDocument } from 'src/products/schema/product.schema';

export type WishlistDocument = HydratedDocument<Wishlist>;

export class Wishlist {
  @Prop({
    required: true,
  })
  total: number;

  @Prop({
    type: SchemaTypes.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    default: [],
  })
  items: ProductDocument[];
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);

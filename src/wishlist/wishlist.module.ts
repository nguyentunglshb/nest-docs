import { Module } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wishlist, WishlistSchema } from './schema/wishlist.schema';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Wishlist.name,
        schema: WishlistSchema,
      },
    ]),
    ProductsModule,
  ],
  providers: [WishlistService],
  controllers: [WishlistController],
})
export class WishlistModule {}

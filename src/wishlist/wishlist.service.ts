import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from './schema/wishlist.schema';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  async getUserWishlist(userId: string) {
    return await this.wishlistModel.findOne({ userId });
  }
}

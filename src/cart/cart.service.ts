import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ItemDto } from './dto/item.dto';
import { Cart, CartDocument } from './schema/cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async getAll() {
    return await this.cartModel.find();
  }

  async createCart(
    userId: string,
    itemDto: ItemDto,
    subTotalPrice: number,
    totalPrice: number,
  ) {
    const newCart = new this.cartModel({
      userId,
      items: [{ ...itemDto, subTotalPrice }],
      totalPrice,
    });
    return await newCart.save();
  }

  async getUserCart(userId: string) {
    return await this.cartModel.findOne({ userId });
  }

  async deleteUserCart(userId: string) {
    return await this.cartModel.findOneAndDelete({ userId });
  }

  private recalculateCart(cart: CartDocument) {
    cart.totalPrice = 0;
    cart.items.forEach((item) => {
      cart.totalPrice += item.quantity * item.price;
    });
  }

  async addToCart(userId: string, itemDto: ItemDto) {
    const { productId, quantity, price } = itemDto;
    const subTotalPrice = quantity * price;
    const cart = await this.getUserCart(userId);

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId,
      );

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = Number(item.quantity) + Number(quantity);
        item.subTotalPrice = item.quantity * item.price;

        cart.items[itemIndex] = item;
        this.recalculateCart(cart);
        return cart.save();
      } else {
        cart.items.push({ ...itemDto, subTotalPrice });
        this.recalculateCart(cart);
        return cart.save();
      }
    } else {
      this.createCart(userId, itemDto, subTotalPrice, price);
    }
  }

  async removeItemFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getUserCart(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId == productId,
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      return cart.save();
    }
  }
}

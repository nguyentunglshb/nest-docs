import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async getAllOrder(_id: string) {
    return await this.orderModel.find();
  }

  async deleteOrder(_id: string) {
    return await this.orderModel.findOneAndRemove({ _id });
  }

  async createNewCheckout(
    userId: string,
    createCheckoutDto: CreateCheckoutDto,
  ) {
    const currentCart = await this.cartService.getUserCart(userId);

    const newOrder = new this.orderModel({
      ...createCheckoutDto,
      items: currentCart.items,
      totalPrice: currentCart.totalPrice,
    });

    currentCart.items.splice(0, currentCart.items.length);
    currentCart.totalPrice = 0;

    await currentCart.save();

    return await newOrder.save();
  }
}

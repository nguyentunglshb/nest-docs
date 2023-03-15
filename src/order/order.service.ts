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
    return 'Get all order ' + _id;
  }

  async createNewCheckout(
    userId: string,
    createCheckoutDto: CreateCheckoutDto,
  ) {
    const newOrder = new this.orderModel(createCheckoutDto);

    const currentCart = await this.cartService.getUserCart(userId);

    currentCart.items.splice(0, currentCart.items.length);

    return [await newOrder.save(), await currentCart.save()];
  }
}

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CartService } from './cart.service';
import { ItemDto } from './dto/item.dto';

@Controller('cart')
@UseInterceptors(TransformInterceptor)
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  // @Get()
  // getAll() {
  //   return this.cartService.getAll();
  // }

  @Post()
  async addToCart(@Request() req, @Body() itemDto: ItemDto) {
    const userId = req.user.userId;
    const cart = await this.cartService.addToCart(userId, itemDto);
    return cart;
  }

  @Get()
  getCart(@Request() req) {
    return this.cartService.getUserCart(req.user.userId);
  }
}

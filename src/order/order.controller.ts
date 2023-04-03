import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OrderService } from './order.service';

@Controller('order')
@UseInterceptors(TransformInterceptor)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getUserOrders(@Request() req) {
    return this.orderService.getAllOrder(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createCheckout(@Request() req, @Body() createCheckoutDto: CreateCheckoutDto) {
    return this.orderService.createNewCheckout(
      req.user.userId,
      createCheckoutDto,
    );
  }

  @Delete(':_id')
  @UseGuards(JwtAuthGuard)
  deleteOrder(@Param('_id') _id: string) {
    return this.orderService.deleteOrder(_id);
  }
}

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
import * as moment from 'moment';
import 'moment/locale/pt-br';
import * as crypto from 'crypto';
import * as querystring from 'qs';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { OrderService } from './order.service';

import { sortObject } from 'src/utils';
import { CreatepaymentDto } from './dto/create-payment.dto';

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

  @Post('create-payment')
  // @UseGuards(JwtAuthGuard)
  createPayment(@Request() req, @Body() createPaymentDto: CreatepaymentDto) {
    const { amount, bankCode, language } = createPaymentDto;

    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = process.env.vnp_TmnCode;
    const secretKey = process.env.vnp_HashSecret;
    let vnpUrl = process.env.vnp_Url;
    const returnUrl = process.env.vnp_ReturnUrl;
    const orderId = moment(date).format('DDHHmmss');

    let locale = language;
    if (!locale) {
      locale = 'vn';
    }

    const currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = +amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
      vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let signData = querystring.stringify(vnp_Params, { encode: false });

    console.log({ signData });

    let hmac = crypto.createHmac('sha512', secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return this.orderService.createPayment(vnpUrl);
  }
}

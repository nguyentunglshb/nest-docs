import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from './../common/interceptors/transform.interceptor';
import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Request,
  Body,
} from '@nestjs/common';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
@UseInterceptors(TransformInterceptor)
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Request() req) {
    const userId = req.user.userId;
    return this.wishlistService.getUserWishlist(userId);
  }
}

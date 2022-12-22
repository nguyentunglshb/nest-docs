import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService, // private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Post('signup')
  // async signUp(@Body() createUserDto: CreateUserDto) {
  //   await this.authService.signUp(createUserDto);
  // }
}

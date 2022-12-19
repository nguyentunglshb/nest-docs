import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ParseIntPipe } from './../common/pipes/parse-int.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  // Post,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
// import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  // @UseGuards(JwtAuthGuard)
  // @Get(':userId')
  // async findById(@Param('userId', new ParseIntPipe()) userId: number) {
  //   return this.usersService.findById(userId);
  // }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a ${id} user`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }
}

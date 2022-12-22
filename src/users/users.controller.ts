import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
  @Get(':_id')
  async findById(@Param('_id') _id: string) {
    return this.usersService.findById(_id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `This action removes a ${id} user`;
  }

  @Post(':_id')
  update(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(_id, updateUserDto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }
}

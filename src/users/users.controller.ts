import { OtherService } from 'src/other/other.service';
import { UpdateUserDto } from './dto/update-user.dto';
// import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  // UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private otherService: OtherService,
  ) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':_id')
  findById(@Param('_id') _id: string) {
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

  @Put(':_id')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @Param('_id') _id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imageUrl = await this.otherService.uploadImageToCloudinary(file);
    return this.usersService.uploadAvatar(_id, imageUrl);
  }
}

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {
  // HttpException,
  // HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { EnumUserStatus } from './interfaces/user.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findById(_id: string) {
    return await this.userModel.findOne({ _id });
  }

  async findOne(username: string) {
    return await this.userModel.findOne({
      username,
    });
  }

  async getUserInfo(_id: string) {
    return this.findById(_id);
  }

  async signUp(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.userModel.findOne({
      username,
    });

    if (user) {
      // throw new HttpException('This username exists', HttpStatus.UNAUTHORIZED);
      throw new UnauthorizedException();
    }

    const newUser = new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
      status: EnumUserStatus.ACTIVE,
    });

    return await newUser.save();
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(_id, updateUserDto);
    return 'update successfully';
  }

  async uploadAvatar(_id: string, avatarUrl: string) {
    await this.userModel.findByIdAndUpdate(_id, {
      avatarUrl,
    });
    return 'upload avatar successfully';
  }
}

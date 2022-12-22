import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';
import { EnumUserStatus } from './interfaces/user.enum';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(_id: string) {
    return this.userModel.findOne({ _id });
  }

  async findOne(username: string) {
    return await this.userModel.findOne({
      username,
    });
  }

  async signUp(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const user = await this.userModel.findOne({
      username,
    });

    if (user)
      return {
        message: 'This username has been used',
      };

    const newUser = new this.userModel({
      ...createUserDto,
      status: EnumUserStatus.ACTIVE,
    });

    return await newUser.save();
  }

  async updateUser(_id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(_id, updateUserDto);

    return 'update successfully';
  }
}

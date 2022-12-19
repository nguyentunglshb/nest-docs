import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findAll() {
    return this.users;
  }

  async findById(userId: number) {
    return this.users.find((u) => u.userId === userId);
  }

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }

  async signUp(body) {
    const { username, password } = body;
    console.log(body);

    const userId = Math.max(...this.users.map((u) => u.userId)) + 1;
    this.users.push({
      userId,
      username,
      password,
    });
    return body;
  }
}

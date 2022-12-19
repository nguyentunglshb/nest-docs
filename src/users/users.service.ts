import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
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

  async findOne(username: string): Promise<User | undefined> {
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

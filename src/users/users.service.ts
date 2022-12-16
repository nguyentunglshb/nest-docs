import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(user: User) {
    const ids = this.users.map((u) => u.id);
    this.users.push({
      ...user,
      id: ids.length ? Math.max(...ids) + 1 : 1,
    });
  }

  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }

  findAll() {
    return this.users;
  }
}

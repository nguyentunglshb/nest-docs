import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    const ids = this.cats.map((c) => c.id);
    this.cats.push({
      ...cat,
      id: ids.length ? Math.max(...ids) + 1 : 1,
    });
  }

  findOne(id: number) {
    return this.cats.find((c) => c.id === id);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}

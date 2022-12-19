import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat, CatDocument } from './schema/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}
  // private readonly cats: Cat[] = [];

  // create(cat: Cat) {
  //   const ids = this.cats.map((c) => c.id);
  //   this.cats.push({
  //     ...cat,
  //     id: ids.length ? Math.max(...ids) + 1 : 1,
  //   });
  // }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createCat = new this.catModel(createCatDto);
    return createCat.save();
  }

  // findOne(id: number) {
  //   return this.cats.find((c) => c.id === id);
  // }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find();
  }
}

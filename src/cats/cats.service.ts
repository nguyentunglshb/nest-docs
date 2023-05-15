import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Cat, CatDocument } from './schema/cat.schema';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    console.log(createCatDto);

    const createCat = new this.catModel(createCatDto);
    return createCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find();
  }
}

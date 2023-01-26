import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schema/product.schema';
import { OtherService } from 'src/other/other.service';
import { EnumProductStatus } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private otherService: OtherService,
  ) {}

  async getAll() {
    return await this.productModel.find();
  }

  async getById(_id: string) {
    return await this.productModel.findOne({ _id });
  }

  async create(
    createProductDto: CreateProductDto,
    files: {
      headImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ) {
    const { name } = createProductDto;

    const product = await this.productModel.findOne({ name });
    if (product)
      return {
        message: 'This name has been used',
      };

    const { headImageUrl, imageUrls } =
      await this.otherService.uploadMutilImagesToCloudinary(files);
    const newProduct = new this.productModel({
      ...createProductDto,
      createdAt: new Date(),
      status: EnumProductStatus.ACTIVE,
      headImageUrl: headImageUrl.length ? headImageUrl[0] : [],
      imageUrls: imageUrls.length ? imageUrls : [],
    });

    await newProduct.save();

    return {
      message: 'product created successfully',
    };
  }

  async delete(_id: string) {
    return await this.productModel.findByIdAndDelete({ _id });
  }
}

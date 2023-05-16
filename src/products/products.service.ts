import { CreateProductDto } from './dto/create-product.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schema/product.schema';
import { OtherService } from 'src/other/other.service';
import { EnumProductStatus } from './interface/product.interface';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    const targetProduct = await this.productModel.findOne({ _id });
    targetProduct.views += 1;
    await targetProduct.save();

    return targetProduct;
  }

  @UseGuards(JwtAuthGuard)
  async buyAndUpdate(_id: string) {
    const targetProduct = await this.productModel.findOne({ _id });
    targetProduct.boughts += 1;
    await targetProduct.save();

    return targetProduct;
  }

  async getByKeyword(searchTerm: string) {
    const regex = new RegExp(searchTerm, 'i');
    return await this.productModel.find({
      $or: [
        {
          name: {
            $regex: regex,
          },
        },
        {
          tags: {
            $in: [searchTerm],
          },
        },
      ],
    });
  }

  async getMostView(type: 'views' | 'boughts') {
    return await this.productModel.aggregate([
      {
        $sort: { [type]: -1 },
      },
      {
        $limit: 8,
      },
    ]);
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
      bought: 0,
      view: 0,
    });

    return await newProduct.save();
  }

  async delete(_id: string) {
    return await this.productModel.findByIdAndDelete({ _id });
  }
}

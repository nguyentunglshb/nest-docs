import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('products')
@UseInterceptors(TransformInterceptor)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.getAll();
  }

  @Get(':_id')
  findById(@Param('_id') _id: string) {
    return this.productsService.getById(_id);
  }

  // @Post()
  // create(@Body() createProductDto: CreateProductDto) {
  //   console.log(createProductDto);

  //   return this.productsService.create(createProductDto);
  // }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'headImage',
        maxCount: 1,
      },
      {
        name: 'images',
      },
    ]),
  )
  async uploadMutilImages(
    @UploadedFiles()
    files: {
      headImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, files);
  }
}

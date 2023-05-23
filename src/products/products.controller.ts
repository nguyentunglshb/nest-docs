import { ProductsService } from './products.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
    return await this.productsService.create(createProductDto, files);
  }

  @Get('?')
  getAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 16,
  ) {
    return this.productsService.getAll(page, perPage);
  }

  @Get('search/:searchTerm')
  findByKeyword(@Param('searchTerm') searchTerm: string) {
    if (!searchTerm.trim()) return [];
    return this.productsService.getByKeyword(searchTerm);
  }

  @Get('most?')
  getMostTheMostProduct(@Query('type') type: 'views' | 'boughts') {
    return this.productsService.getMostView(type);
  }

  @Get('forCSV')
  getForCSV() {
    return this.productsService.forCSV();
  }

  @Get(':_id')
  findById(@Param('_id') _id: string) {
    return this.productsService.getById(_id);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    console.log(createProductDto);
    return 1;
  }

  @Delete(':_id')
  delete(@Param('_id') _id: string) {
    return this.productsService.delete(_id);
  }
}

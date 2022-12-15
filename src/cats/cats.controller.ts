import {
  Controller,
  Get,
  // Query,
  Post,
  Body,
  // Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import {
  CreateCatDto,
  // , UpdateCatDto, ListAllEntities
} from './dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    const cats = await this.catsService.findAll();
    return cats;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

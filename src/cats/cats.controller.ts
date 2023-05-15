import {
  Controller,
  Get,
  // Query,
  Post,
  Body,
  // Put,
  Param,
  Delete,
  // HttpException,
  // HttpStatus,
  // UseFilters,
  // ForbiddenException,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
  // Query,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/entities/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
// import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CatsService } from './cats.service';
import {
  CreateCatDto,
  // , UpdateCatDto, ListAllEntities
} from './dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(TransformInterceptor)
// @UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // @Roles(Role.ADMIN)
  async create(@Body() createCatDto: CreateCatDto) {
    // await this.catsService.create(createCatDto);
    return createCatDto;
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    const cats = await this.catsService.findAll();
    return cats;
  }

  // @Get(':id')
  // async findOne(@Param('id', new ParseIntPipe()) id: number) {
  //   return this.catsService.findOne(id);
  // }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
  //   return `This action updates a #${id} cat`;
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}

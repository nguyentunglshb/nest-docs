import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';

import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
@UseInterceptors(TransformInterceptor)
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getAll() {
    return this.blogsService.getAll();
  }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }
}

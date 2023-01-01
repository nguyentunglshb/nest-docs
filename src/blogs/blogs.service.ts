import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { Blog, BlogDocument } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async getAll() {
    return await this.blogModel.find();
  }

  async create(createBlogDto: CreateBlogDto) {
    const { title } = createBlogDto;

    const blog = await this.blogModel.findOne({ title });
    if (blog) {
      return {
        message: 'This title has been used',
      };
    }

    const newBlog = new this.blogModel({
      ...createBlogDto,
      createdAt: new Date(),
    });

    await newBlog.save();
    return {
      message: 'product created successfully',
    };
  }
}

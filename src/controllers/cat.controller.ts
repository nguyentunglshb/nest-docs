import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Redirect,
} from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  @Header('Cache-Control', 'none')
  @HttpCode(204)
  @Redirect('https://nestjs.com', 301)
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll(): string {
    return 'This action returns all cats';
  }
}

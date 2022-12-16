import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .useGlobalFilters(new HttpExceptionFilter())
    .useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import helmet from 'helmet';
import { MongooseModule } from '@nestjs/mongoose';

import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { CatsController } from './cats/cats.controller';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import configuration from './config/configuration';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BlogsModule } from './blogs/blogs.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CatsModule,
    UsersModule,
    AuthModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [configuration],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@ainest.9qfhkxr.mongodb.net/?retryWrites=true&w=majority`,
    ),
    ProductsModule,
    BlogsModule,
    CartModule,
    OrderModule,
  ],
  providers: [
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(helmet(), LoggerMiddleware)
      // .forRoutes('cats');
      .exclude({
        path: 'cats',
        method: RequestMethod.POST,
      })
      // .forRoutes({
      //   path: 'cats',
      //   method: RequestMethod.ALL,
      // });
      .forRoutes(CatsController);
  }
}

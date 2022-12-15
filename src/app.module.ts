import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import helmet from 'helmet';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [CatsModule],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: HttpExceptionFilter,
  //   },
  // ],
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

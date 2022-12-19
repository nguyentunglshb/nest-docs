import { UsersModule } from './users/users.module';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import helmet from 'helmet';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.midleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CatsModule, UsersModule, AuthModule],
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

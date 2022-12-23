import { CloudinaryModule } from './../cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';

import { OtherService } from './other.service';
import { OtherController } from './other.controller';

@Module({
  imports: [CloudinaryModule],
  providers: [OtherService],
  exports: [OtherService],
  controllers: [OtherController],
})
export class OtherModule {}

import { OtherService } from 'src/other/other.service';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('other')
export class OtherController {
  constructor(private otherService: OtherService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.otherService.uploadImageToCloudinary(file);
  }
}

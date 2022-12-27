import { OtherService } from 'src/other/other.service';
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('other')
export class OtherController {
  constructor(private otherService: OtherService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.otherService.uploadImageToCloudinary(file);
  }

  @Post('multiple')
  @UseInterceptors(
    FileFieldsInterceptor([
      {
        name: 'images',
      },
    ]),
  )
  uploadMultiple(@UploadedFiles() files) {
    return this.otherService.uploadMutilImagesToCloudinary(files);
  }
}

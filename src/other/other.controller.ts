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
    // console.log('file: ', file);

    // return { file };
    return this.otherService.uploadImageToCloudinary(file);
  }

  @Post('multiple')
  @UseInterceptors(
    // FileFieldsInterceptor([
    //   {
    //     name: 'images',
    //   },
    // ]),
    FileFieldsInterceptor([
      {
        name: 'headImage',
        maxCount: 1,
      },
      {
        name: 'images',
      },
    ]),
  )
  uploadMultiple(
    @UploadedFiles()
    files: {
      headImage?: Express.Multer.File[];
      images?: Express.Multer.File[];
    },
  ) {
    // console.log(files);
    // return { files };
    return this.otherService.uploadMutilImagesToCloudinary(files);
  }
}

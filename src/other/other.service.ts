import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  constructor(private cloudinary: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary
      .uploadImage(file)
      .then((result) => result.url)
      .catch(() => {
        throw new BadRequestException('Invalid file type');
      });
  }

  async uploadMutilImagesToCloudinary({
    headImage,
    images,
  }: {
    headImage?: Express.Multer.File[];
    images?: Express.Multer.File[];
  }) {
    const imageUrls = {
      headImageUrl: [],
      imageUrls: [],
    };

    if (headImage && headImage.length) {
      for (const file of headImage) {
        await this.cloudinary
          .uploadImage(file)
          .then((result) => imageUrls.headImageUrl.push(result.url))
          .catch(() => {
            throw new BadRequestException('Invalid file type');
          });
      }
    }

    if (images && images.length) {
      for (const file of images) {
        await this.cloudinary
          .uploadImage(file)
          .then((result) => imageUrls.imageUrls.push(result.url))
          .catch(() => {
            throw new BadRequestException('Invalid file type');
          });
      }
    }

    return imageUrls;
  }
}

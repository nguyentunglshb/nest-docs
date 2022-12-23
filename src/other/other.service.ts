import { CloudinaryService } from './../cloudinary/cloudinary.service';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OtherService {
  constructor(private cloudinaty: CloudinaryService) {}

  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinaty
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
    for (const file of headImage) {
      await this.cloudinaty
        .uploadImage(file)
        .then((result) => imageUrls.headImageUrl.push(result.url))
        .catch(() => {
          throw new BadRequestException('Invalid file type');
        });
    }
    for (const file of images) {
      await this.cloudinaty
        .uploadImage(file)
        .then((result) => imageUrls.imageUrls.push(result.url))
        .catch(() => {
          throw new BadRequestException('Invalid file type');
        });
    }
    return imageUrls;
  }
}

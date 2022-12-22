import { IsString } from 'class-validator';
import { EnumUserStatus } from '../interfaces/user.enum';

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsString()
  status?: EnumUserStatus;
}

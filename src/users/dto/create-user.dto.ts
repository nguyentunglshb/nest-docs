import { IsString } from 'class-validator';
// import { Role } from 'src/common/entities/roles.enum';

export class CreateUserDto {
  // @IsString()
  // firstName: string;

  // @IsString()
  // lastName: string;

  // @IsString()
  // email: string;

  // @IsArray()
  // roles: Role[];

  // @IsNumber()
  // userId?: number;

  @IsString()
  username: string;

  @IsString()
  password: string;
}

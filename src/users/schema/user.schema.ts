import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EnumUserStatus } from '../interfaces/user.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({
    default: '',
  })
  avatarUrl: string;

  @Prop({
    default: EnumUserStatus.ACTIVE,
  })
  status: string;

  @Prop()
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

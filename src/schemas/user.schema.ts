import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: false })
  google: boolean;
  @Prop({ default: true })
  status: boolean;
  @Prop({ required: true, default: 'User_Role' })
  role: string;
  @Prop({ default: 'ExapmleImages/e.jpe' })
  img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

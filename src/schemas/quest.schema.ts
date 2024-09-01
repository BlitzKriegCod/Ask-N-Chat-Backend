import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestDocument = HydratedDocument<Quest>;

@Schema({ autoIndex: true })
export class Quest {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true, maxlength: 40, minlength: 4 })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  AskForThisQuestion: string[];
}
export const QuestSchema = SchemaFactory.createForClass(Quest);

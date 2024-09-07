import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type QuestDocument = HydratedDocument<Quest>;

@Schema()
export class Quest {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  Author: mongoose.Schema.Types.ObjectId;
  @Prop({ required: true, maxlength: 40, minlength: 4 })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  expected: string;
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'answer' }] })
  AnswersForThisQuestion: mongoose.Schema.Types.ObjectId[];
  @Prop({ type: [{ type: String }] })
  Tags: string[];
  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now, update: Date.now })
  updatedAt: Date;
}
export const QuestSchema = SchemaFactory.createForClass(Quest);

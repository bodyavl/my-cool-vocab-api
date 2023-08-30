import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Word } from '../../word/models/word.model';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop([String])
  refresh_tokens: string[];

  @Prop({type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Word'}]})
  words: Word[]

}

export const UserSchema = SchemaFactory.createForClass(User);

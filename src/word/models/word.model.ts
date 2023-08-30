import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../../auth/models";


@Schema()
export class Word {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop()
    source_word: string

    @Prop()
    translation: string
}

export const WordSchema = SchemaFactory.createForClass(Word);
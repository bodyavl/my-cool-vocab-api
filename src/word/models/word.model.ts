import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Word {
    @Prop()
    source_word: string
    
    @Prop()
    transcription: string

    @Prop()
    translation: string
}

export const WordSchema = SchemaFactory.createForClass(Word);
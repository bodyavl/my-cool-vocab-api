import { Module } from '@nestjs/common';
import { WordService } from './word.service';
import { WordController } from './word.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './models/word.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }]),
  ],
  controllers: [WordController],
  providers: [WordService],
})
export class WordModule {}

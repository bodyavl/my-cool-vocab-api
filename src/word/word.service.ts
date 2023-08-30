import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Word } from './models/word.model';
import { Model } from 'mongoose';

@Injectable()
export class WordService {

  constructor(@InjectModel(Word.name) private readonly wordModel: Model<Word>) {}

  async create(dto: CreateWordDto) {
    return 'This action adds a new word';
  }

  findAll() {
    return `This action returns all word`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }
}

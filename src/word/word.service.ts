import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Word } from './models/word.model';
import { Model } from 'mongoose';

@Injectable()
export class WordService {
  constructor(
    @InjectModel(Word.name) private readonly wordModel: Model<Word>,
  ) {}

  async create(userId: string, dto: CreateWordDto): Promise<Word> {
    const word = await this.wordModel.create({
      user: userId,
      ...dto,
    });
    return word;
  }

  async findAll(userId: string): Promise<Word[]> {
    const words = await this.wordModel.find({ user: userId });
    return words;
  }

  async findOne(userId: string, id: string): Promise<Word> {
    const word = await this.wordModel.findOne({
      _id: id,
      user: userId,
    });
    return word;
  }

  async update(userId: string, id: string, dto: UpdateWordDto): Promise<Word> {
    const word = await this.wordModel.findOneAndUpdate(
      {
        _id: id,
        user: userId,
      },
      {
        ...dto,
      },
      { new: true },
    );
    return word;
  }

  async remove(userId: string, id: string): Promise<Word> {
    const word = await this.wordModel.findOneAndDelete({
      _id: id,
      user: userId
    })
    return word;
  }
}

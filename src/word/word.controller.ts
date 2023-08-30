import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { AccessTokenGuard } from '../auth/guard';
import { GetUser } from '../auth/decorators';

@UseGuards(AccessTokenGuard)
@Controller('word')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Post()
  create(@GetUser('id') userId: string, @Body() createWordDto: CreateWordDto) {
    return this.wordService.create(userId, createWordDto);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.wordService.findAll(userId);
  }

  @Get(':id')
  findOne(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.wordService.findOne(userId, id);
  }

  @Patch(':id')
  update(@GetUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateWordDto) {
    return this.wordService.update(userId, id, dto);
  }

  @Delete(':id')
  remove(@GetUser('id') userId: string, @Param('id') id: string) {
    return this.wordService.remove(userId, id);
  }
}

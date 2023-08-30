import { PartialType } from '@nestjs/mapped-types';
import { CreateWordDto } from './create-word.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateWordDto {
    @IsString()
    @IsOptional()
    source_word?: string

    @IsString()
    @IsOptional()
    translation?: string
}

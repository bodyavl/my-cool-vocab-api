import { IsNotEmpty, IsString, isString } from "class-validator";

export class CreateWordDto {
    @IsString()
    @IsNotEmpty()
    source_word: string

    @IsString()
    @IsNotEmpty()
    translation: string
}

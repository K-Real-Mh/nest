import { IsNotEmpty, IsString, ValidateIf, IsNumber } from 'class-validator';

export class NewsCreateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateIf((o) => o.author)
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;
}

import {
  IsNotEmpty,
  IsString,
  ValidateIf,
  IsDateString,
} from 'class-validator';

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

  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;

  @IsNotEmpty()
  @IsDateString()
  createdAt: string;
}

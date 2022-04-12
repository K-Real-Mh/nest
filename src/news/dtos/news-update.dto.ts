import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class NewsUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  newsId: number;

  @ValidateIf((o) => o.title)
  @IsString()
  title: string;

  @ValidateIf((o) => o.description)
  @IsString()
  description: string;

  @ValidateIf((o) => o.author)
  @IsString()
  author: string;

  @ValidateIf((o) => o.cover)
  @IsString()
  cover: string;
}

import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CommentsCreateDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar: string;

  @IsNotEmpty()
  @IsNumber()
  newsId: number;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @ValidateIf((o) => o.idParent)
  @IsString()
  idParent: string;
}

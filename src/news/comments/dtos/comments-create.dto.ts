import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CommentsCreateDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @ValidateIf((o) => o.avatar)
  @IsString()
  avatar: string;
  @IsNotEmpty()
  @IsString()
  idNews: string;
  @ValidateIf((o) => o.idParent)
  @IsString()
  idParent: string;
}

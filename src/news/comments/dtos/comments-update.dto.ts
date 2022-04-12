import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentsUpdateDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}

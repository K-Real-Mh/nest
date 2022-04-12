import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentsDeleteDto {
  @IsNotEmpty()
  @IsNumber()
  commentId: number;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('all')
  getAll(@Query('idNews') idNews): Promise<Comment[]> {
    return this.commentsService.findAll(idNews);
  }
  @Post()
  create(@Query('idNews') idNews, @Body() comment): Promise<number> {
    return this.commentsService.create(idNews, comment);
  }
  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }
  @Patch(':id')
  update(
    @Query('idNews') idNews,
    @Param('id') idComment,
    @Body() comment: Comment,
  ): Promise<boolean> {
    return this.commentsService.update(idNews, idComment, comment.comment);
  }

  @Delete('all')
  removeAll(@Query('idNews') idNews): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
}

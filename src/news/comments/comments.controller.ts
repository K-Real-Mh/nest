import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.interface';
import { CommentsCreateDto } from './dtos/comments-create.dto';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const PATH_NEWS = '/news-static/comments-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('all')
  getAll(@Query('idNews') idNews): Promise<Comment[]> {
    return this.commentsService.findAll(idNews);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('avatar', 1, {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Body() comments: CommentsCreateDto,
    // @Query('idNews') idNews,
    // @Query('idParent') idParent,
    @UploadedFiles() avatar: Express.Multer.File,
  ): Promise<number> {
    let avatarPath;
    if (avatar && avatar[0]?.filename?.length > 0) {
      avatarPath = PATH_NEWS + avatar[0].filename;
    }
    return this.commentsService.create(
      comments.idNews,
      comments.idParent,
      comments.text,
      avatarPath,
    );
  }

  @Delete(':id')
  remove(@Query('idNews') idNews, @Param('id') idComment): Promise<boolean> {
    return this.commentsService.remove(idNews, idComment);
  }

  @Patch(':id')
  update(
    @Query('idNews') idNews,
    @Param('id') idComment,
    @Body() comment: CommentsCreateDto,
  ): Promise<boolean> {
    return this.commentsService.update(idNews, idComment, comment.text);
  }

  @Delete('all')
  removeAll(@Query('idNews') idNews): Promise<boolean> {
    return this.commentsService.removeAll(idNews);
  }
}

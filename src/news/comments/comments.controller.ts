import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsCreateDto } from './dtos/comments-create.dto';
import { HelperFileLoader } from '../../utils/HelperFileLoader';
import { CommentsEntity } from '../../database/entities/comments.entity';
import { UsersService } from '../../users/users.service';
import { NewsService } from '../news.service';
import { CommentsUpdateDto } from './dtos/comments-update.dto';
import { CommentsDeleteDto } from './dtos/comments-delete.dto';

const PATH_NEWS = '/news-static/comments-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
    private readonly newsService: NewsService,
  ) {}

  @Post()
  async create(@Body() comment: CommentsCreateDto): Promise<CommentsEntity> {
    // Поиск пользователя по его ID
    const _user = await this.usersService.findById(comment.authorId);
    if (!_user) {
      throw new HttpException(
        'Не существует такого автора',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Поиск новости по его ID
    const _news = await this.newsService.findById(comment.newsId);
    if (!_news) {
      throw new HttpException(
        'Не существует такой новости',
        HttpStatus.BAD_REQUEST,
      );
    }

    const _commentsEntity = new CommentsEntity();
    _commentsEntity.message = comment.text;
    _commentsEntity.user = _user;
    _commentsEntity.news = _news;

    return await this.commentsService.create(_commentsEntity);
  }

  @Patch()
  async update(@Body() comment: CommentsUpdateDto): Promise<CommentsEntity> {
    return await this.commentsService.update(comment);
  }

  @Delete()
  async delete(@Body() comment: CommentsDeleteDto): Promise<CommentsEntity> {
    return await this.commentsService.delete(comment.commentId);
  }
}

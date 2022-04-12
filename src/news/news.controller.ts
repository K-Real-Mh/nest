import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsCreateDto } from './dtos/news-create.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { diskStorage } from 'multer';
import { NewsEntity } from '../database/entities/news.entity';
import { UsersService } from '../users/users.service';
import { CategoriesService } from '../categories/categories.service';
import { NewsUpdateDto } from './dtos/news-update.dto';

const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
    private readonly newsService: NewsService,
  ) {}

  @Get()
  async getNews(): Promise<NewsEntity[]> {
    return await this.newsService.findAll();
  }

  @Get('/filterByUser/:id')
  async getNewsByUser(@Param('id') id: number): Promise<NewsEntity[]> {
    return await this.newsService.findAll(id);
  }

  @Post()
  @UseInterceptors(
    FilesInterceptor('cover', 1, {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async create(
    @Body() news: NewsCreateDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<NewsEntity> {
    // Поиск пользователя по его ID
    const _user = await this.usersService.findById(news.authorId);
    if (!_user) {
      throw new HttpException(
        'Не существует такого автора',
        HttpStatus.BAD_REQUEST,
      );
    }
    // Поиск категории по её ID
    const _category = await this.categoriesService.findById(news.categoryId);
    if (!_category) {
      throw new HttpException(
        'Не существует такой категории',
        HttpStatus.BAD_REQUEST,
      );
    }
    const _newsEntity = new NewsEntity();
    if (cover?.filename) {
      _newsEntity.cover = PATH_NEWS + cover.filename;
    }
    _newsEntity.title = news.title;
    _newsEntity.description = news.description;
    // Добавление пользователя в связь
    _newsEntity.user = _user;
    // Добавление категории в связь
    _newsEntity.category = _category;

    return await this.newsService.create(_newsEntity);
  }

  @Patch()
  @UseInterceptors(
    FilesInterceptor('cover', 1, {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  async update(
    @Body() news: NewsUpdateDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<NewsEntity> {
    let entityCover: string;

    if (cover?.filename) {
      entityCover = PATH_NEWS + cover.filename;
    }

    return await this.newsService.update(news, entityCover);
  }
}

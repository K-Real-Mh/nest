import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { CommentsService } from './comments/comments.service';
import { detailTemplate } from '../views/detail';
import { NewsIdDto } from './dtos/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HelperFileLoader } from '../utils/HelperFileLoader';
import { diskStorage } from 'multer';
import { MailService } from '../mail/mail.service';

const PATH_NEWS = '/news-static/';
const helperFileLoader = new HelperFileLoader();
helperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
    private mailService: MailService,
  ) {}

  @Get('template')
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }

  @Get('/all/')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
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
    @UploadedFiles() cover: Express.Multer.File,
  ) {
    let coverPath;
    if (cover[0]?.filename?.length > 0) {
      coverPath = PATH_NEWS + cover[0].filename;
    }
    const _news = this.newsService.create({
      ...news,
      cover: coverPath,
    });
    await this.mailService.sendNewNewsForAdmins(
      ['kir.mahoff@yandex.ru'],
      _news,
    );
    return _news;
  }

  @Post('/update/:id')
  async createPost(
    @Param('id') id: string,
    @Body() data: NewsCreateDto,
  ): Promise<string> {
    const result = this.newsService.update(id, data);
    if (result) {
      await this.mailService.sendNewUpdateForAdmins(
        ['kir.mahoff@yandex.ru'],
        result,
      );
      return 'Success!';
    }
    throw new Error('Fail');
  }

  @Delete(':id')
  async remove(@Param() params: NewsIdDto): Promise<boolean> {
    return (
      this.newsService.remove(params.id) &&
      this.commentService.removeAll(params.id)
    );
  }

  @Get('/:id')
  async getById(@Param() params: NewsIdDto): Promise<News | undefined> {
    return this.newsService.findById(params.id);
  }

  @Get(':id/detail')
  async getView(@Param('id') id): Promise<string> {
    const news = this.newsService.findById(id);
    const comments = await this.commentService.findAll(id);

    return detailTemplate(news, comments);
  }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 5, {
      storage: diskStorage({
        destination: helperFileLoader.destinationPath,
        filename: helperFileLoader.customFileName,
      }),
    }),
  )
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  uploadFile(@UploadedFiles() file: Express.Multer.File[]) {}
}

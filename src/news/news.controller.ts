import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { CommentsService } from './comments/comments.service';
import { detailTemplate } from '../views/detail';
import { NewsIdDto } from './dtos/news-id.dto';
import { NewsCreateDto } from './dtos/news-create.dto';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get('/all/')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get(':id')
  async getById(@Param() params: NewsIdDto): Promise<News | undefined> {
    return this.newsService.findById(params.id);
  }

  @Post()
  async create(@Body() news: NewsCreateDto): Promise<number> {
    return this.newsService.create(news);
  }

  @Post('/update/:id')
  async createPost(
    @Param('id') id: string,
    @Body() data: News,
  ): Promise<string> {
    const result = this.newsService.update(id, data);
    if (result) {
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

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }

  @Get(':id/detail')
  async getView(@Param('id') id): Promise<string> {
    const news = this.newsService.findById(id);
    const comments = await this.commentService.findAll(id);

    return detailTemplate(news, comments);
  }
}

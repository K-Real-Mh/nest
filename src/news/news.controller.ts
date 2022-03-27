import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/all/')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Post()
  async create(@Body() news: News): Promise<number> {
    return this.newsService.create(news);
  }

  @Post('/update/:id')
  async createPost(
    @Param('id') id: number,
    @Body() data: News,
  ): Promise<string> {
    const result = this.newsService.update(id, data);
    if (result) {
      return 'Success!';
    }
    throw new Error('Fail');
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }
}

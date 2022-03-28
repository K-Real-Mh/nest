import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.interface';
import { htmlTemplate } from '../views/template';
import { newsTemplate } from '../views/news';
import { CommentsService } from './comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private newsService: NewsService,
    private readonly commentService: CommentsService,
  ) {}

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
  async remove(@Param('id') idNews): Promise<any> {
    return (
      this.newsService.remove(idNews) && this.commentService.removeAll(idNews)
    );
  }

  @Get()
  async getViewAll(): Promise<string> {
    const news = this.newsService.findAll();
    return htmlTemplate(newsTemplate(news));
  }
}

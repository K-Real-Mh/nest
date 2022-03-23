import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './news.interface';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get('/all/')
  async getNews(): Promise<News[]> {
    return this.newsService.findAll();
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
}

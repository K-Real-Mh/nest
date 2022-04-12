import { Injectable } from '@nestjs/common';
import { News } from './news.interface';
import { v4 as uuidv4 } from 'uuid';
import { NewsCreateDto } from './dtos/news-create.dto';

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: '1',
      title: 'first',
      description: 'first',
      author: 'first',
      createdAt: new Date(Date.now()),
      cover: '/news-static/be1b9360-240b-49c1-889b-877eb0231b82.gif',
    },
  ];

  create(news: NewsCreateDto): News {
    const idx = this.news.push({ id: uuidv4(), ...news });
    return this.news[idx - 1];
  }

  update(id: string, data: NewsCreateDto): { new: News; old: News } | null {
    let existingNews = this.findById(id);
    if (existingNews) {
      existingNews = {
        ...existingNews,
        ...data,
      };
      const index = this.news.findIndex((el) => el.id === id);
      const oldNews = this.news[index];
      this.news[index] = existingNews;
      return { new: this.news[index], old: oldNews };
    }
    return null;
  }

  findAll(): News[] {
    return this.news;
  }

  findById(id: string): News | null {
    const existingNews = this.news.find((el) => el.id === id);
    console.assert(
      typeof existingNews !== 'undefined',
      '[findByIndex] Invalid',
    );
    if (typeof existingNews !== 'undefined') {
      return existingNews;
    }
    return null;
  }

  async remove(id: string): Promise<boolean> {
    const index = this.news.findIndex((el) => el.id === id);
    if (index) {
      this.news.splice(index, 1);
      return true;
    }
    return false;
  }
}

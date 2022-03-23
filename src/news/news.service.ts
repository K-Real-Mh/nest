import { Injectable } from '@nestjs/common';
import { News } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: News[] = [
    {
      id: 1,
      title: 'first',
      description: 'first',
      author: 'first',
      createdAt: new Date(Date.now()),
    },
  ];

  create(news: News): number {
    return this.news.push(news);
  }

  update(id: number, data: News): News | null {
    let existingNews = this.findByIndex(id);
    if (existingNews) {
      existingNews = {
        ...existingNews,
        ...data,
      };
      this.news[data.id] = existingNews;
      return this.news[data.id];
    }
    return null;
  }

  findAll(): News[] {
    return this.news;
  }

  findByIndex(index: number): News | null {
    console.assert(
      typeof this.news[index] !== 'undefined',
      '[findByIndex] Invalid',
    );
    if (typeof this.news[index] !== 'undefined') {
      return this.news[index];
    }
    return null;
  }
}

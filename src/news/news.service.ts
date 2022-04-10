import { Injectable } from '@nestjs/common';
import { News } from './news.interface';
import { v4 as uuidv4 } from 'uuid';
import { NewsCreateDto } from './dtos/news-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../database/entities/news.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: NewsEntity): Promise<News> {
    return await this.newsRepository.save(news);
  }

  // update(id: string, data: NewsCreateDto): { new: News; old: News } | null {
  //   let existingNews = this.findById(id);
  //   if (existingNews) {
  //     existingNews = {
  //       ...existingNews,
  //       ...data,
  //     };
  //     const index = this.news.findIndex((el) => el.id === id);
  //     const oldNews = this.news[index];
  //     this.news[index] = existingNews;
  //     return { new: this.news[index], old: oldNews };
  //   }
  //   return null;
  // }

  async findAll(): Promise<NewsEntity[]> {
    return await this.newsRepository.find({});
  }

  async findById(id: number): Promise<NewsEntity[]> {
    return await this.newsRepository.find({ id });
  }

  async remove(id: number): Promise<NewsEntity[]> {
    const _news = await this.findById(id);
    return await this.newsRepository.remove(_news);
  }
}

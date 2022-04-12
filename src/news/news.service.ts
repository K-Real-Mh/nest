import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from '../database/entities/news.entity';
import { NewsUpdateDto } from './dtos/news-update.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: NewsEntity): Promise<NewsEntity> {
    return await this.newsRepository.save(news);
  }

  async update(news: NewsUpdateDto, cover?: string): Promise<NewsEntity> {
    const newsToUpdate = await this.newsRepository.findOne({
      id: news.newsId,
    });

    if (!newsToUpdate) {
      throw new HttpException(
        'Не существует такой новости',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.newsRepository.save({
      ...newsToUpdate,
      ...news,
      cover,
    });
  }

  async findAll(userId?: number): Promise<NewsEntity[]> {
    return await this.newsRepository.find(
      userId
        ? {
            user: {
              id: userId,
            },
          }
        : {},
    );
  }

  async findById(id: number): Promise<NewsEntity> {
    return await this.newsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<NewsEntity> {
    const _news = await this.findById(id);
    return await this.newsRepository.remove(_news);
  }
}

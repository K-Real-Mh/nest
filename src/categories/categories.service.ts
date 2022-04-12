import { Injectable } from '@nestjs/common';
import { CategoriesEntity } from '../database/entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) {}

  async create(name: string): Promise<CategoriesEntity> {
    return await this.categoriesRepository.save({ name });
  }

  async findById(id: number): Promise<CategoriesEntity> {
    return await this.categoriesRepository.findOne({ id });
  }
}

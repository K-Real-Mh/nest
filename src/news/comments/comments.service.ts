import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../../database/entities/comments.entity';
import { CommentsUpdateDto } from './dtos/comments-update.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentsRepository: Repository<CommentsEntity>,
  ) {}

  async create(comment: CommentsEntity): Promise<CommentsEntity> {
    return await this.commentsRepository.save(comment);
  }

  async update(comment: CommentsUpdateDto): Promise<CommentsEntity> {
    const commentToUpdate = await this.commentsRepository.findOne({
      id: comment.commentId,
    });

    if (!commentToUpdate) {
      throw new HttpException(
        'Не существует такого комментария',
        HttpStatus.BAD_REQUEST,
      );
    }

    commentToUpdate.message = comment.text;
    return await this.commentsRepository.save(commentToUpdate);
  }

  async delete(id: number): Promise<CommentsEntity> {
    const commentToDelete = await this.commentsRepository.findOne({
      id: id,
    });

    if (!commentToDelete) {
      throw new HttpException(
        'Не существует такого комментария',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.commentsRepository.remove(commentToDelete);
  }
}

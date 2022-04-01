import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Comment } from './comment.interface';

@Injectable()
export class CommentsService {
  private readonly comments: { [k: string]: Comment[] } = {};

  async create(
    idNews: string,
    idParent: string | undefined,
    comment: string,
    avatar?: string,
  ): Promise<number> {
    if (!this.comments?.[idNews]) {
      this.comments[idNews] = [];
    }

    const index = this.comments?.[idNews].findIndex((x) => x.id === idParent);

    if (!idParent || index === -1) {
      return this.comments[idNews].push({
        comment,
        avatar,
        id: uuidv4(),
        reply: [],
      });
    } else {
      this.comments[idNews][index].reply.push({
        comment,
        avatar,
        id: uuidv4(),
      });
    }
  }

  async findAll(idNews: string): Promise<Comment[] | undefined> {
    return this.comments?.[idNews];
  }

  async remove(idNews: string, idComment: string): Promise<boolean> {
    const index = this.comments?.[idNews].findIndex((x) => x.id === idComment);
    if (index !== -1) {
      this.comments[idNews].splice(index, 1);
      return true;
    }
    return false;
  }

  async update(
    idNews: string,
    idComment: string,
    comment: string,
  ): Promise<boolean> {
    const index = this.comments?.[idNews].findIndex((x) => x.id === idComment);
    if (index !== -1) {
      this.comments[idNews][index] = {
        ...this.comments[idNews][index],
        comment,
      };
      return true;
    }
    return false;
  }

  async removeAll(idNews: string): Promise<boolean> {
    return delete this.comments?.[idNews];
  }
}

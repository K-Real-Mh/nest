import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from '../../database/entities/comments.entity';
import { NewsModule } from '../news.module';
import { UsersModule } from '../../users/users.module';

@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    NewsModule,
    UsersModule,
    TypeOrmModule.forFeature([CommentsEntity]),
  ],
  exports: [CommentsService],
})
export class CommentsModule {}

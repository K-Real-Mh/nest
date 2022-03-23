import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { CalculateModule } from './calculate/calculate.module';

@Module({
  imports: [NewsModule, CalculateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

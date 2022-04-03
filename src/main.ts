import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
// не импортируется !!!
// import * as expressHbs from 'express-handlebars';
import { join } from 'path';
// не импортируется !!!
// import * as hbs from 'hbs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.engine(
  //   'hbs',
  // Это не работает!!
  //   expressHbs({
  //     layoutsDir: join(__dirname, '..', 'views/layouts'),
  //     defaultLayout: 'layout',
  //     extname: 'hbs',
  //   }),
  // );
  // Это не работает!!
  // hbs.registerPartials(__dirname + '/views/partials');
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();

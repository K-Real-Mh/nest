import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';
import { FindOneParams } from './find-one-params.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): { message: string } {
    return { message: 'Hello world!' };
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParams): Promise<string> {
    return 'This action returns a user';
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<string> {
    return 'This action adds a new user';
  }
}

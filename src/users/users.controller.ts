import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { UsersEntity } from '../database/entities/users.entity';
import { UserUpdateDto } from './dtos/user-update.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(@Body() user: UserCreateDto): Promise<UsersEntity> {
    console.log('am here');
    return this.usersService.create(user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(@Body() user: UserUpdateDto): Promise<any> {
    console.log('am heree', user);
    return this.usersService.update(user);
  }
}

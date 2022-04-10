import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../database/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // Возвращаемое значение может быть Promise<UsersEntity|undefined>
  // Озвучить устно, что необходимо отработать крайний случай на уровне выше, если запись не произошла
  async create(user): Promise<UsersEntity | undefined> {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.role = user.role;
    return await this.usersRepository.save(userEntity);
  }
}

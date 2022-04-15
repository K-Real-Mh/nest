import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../database/entities/users.entity';
import { hash } from '../utils/crypto';
import { Role } from '../auth/role/role.enum';
import { UserUpdateDto } from './dtos/user-update.dto';
import { UserCreateDto } from './dtos/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // Возвращаемое значение может быть Promise<UsersEntity|undefined>
  // Озвучить устно, что необходимо отработать крайний случай на уровне выше, если запись не произошла
  async create(user: UserCreateDto): Promise<UsersEntity | undefined> {
    const userEntity = new UsersEntity();
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.email = user.email;
    userEntity.role = user.role;
    userEntity.password = await hash(user.password);

    return await this.usersRepository.save(userEntity);
  }

  async findById(id: number): Promise<UsersEntity> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email): Promise<UsersEntity> {
    return this.usersRepository.findOne({ email });
  }

  async setModerator(idUser): Promise<UsersEntity> {
    const _user = await this.findById(idUser);
    if (!_user) {
      throw new UnauthorizedException();
    }
    _user.role = Role.Moderator;
    return this.usersRepository.save(_user);
  }

  async update(user: UserUpdateDto): Promise<UsersEntity> {
    const userToUpdate = await this.usersRepository.findOne({
      id: user.userId,
    });

    if (!userToUpdate) {
      throw new HttpException(
        'Не существует такого юзера',
        HttpStatus.BAD_REQUEST,
      );
    }

    userToUpdate.firstName = user.firstName
      ? user.firstName
      : userToUpdate.firstName;
    userToUpdate.lastName = user.lastName
      ? user.lastName
      : userToUpdate.lastName;
    userToUpdate.email = user.email ? user.email : userToUpdate.email;
    userToUpdate.role = user.role ? user.role : userToUpdate.role;
    userToUpdate.password = user.password
      ? await hash(user.password)
      : userToUpdate.password;

    return await this.usersRepository.save({
      ...userToUpdate,
      ...user,
    });
  }
}

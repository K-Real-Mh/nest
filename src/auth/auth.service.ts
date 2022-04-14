import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from '../utils/crypto';
import { UsersEntity } from '../database/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UsersEntity | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await compare(pass, user.password))) {
      return user;
    }
    return null;
  }
}

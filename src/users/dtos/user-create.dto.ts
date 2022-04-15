import { IsNotEmpty, IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from '../../auth/role/role.enum';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Role)
  role: Role;
}

import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Role } from '../../auth/role/role.enum';

export class UserUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ValidateIf((o) => o.firstName)
  @IsString()
  firstName: string;

  @ValidateIf((o) => o.lastName)
  @IsString()
  lastName: string;

  @ValidateIf((o) => o.email)
  @IsEmail()
  email: string;

  @ValidateIf((o) => o.password)
  @IsString()
  password: string;

  @ValidateIf((o) => o.role)
  @IsString()
  @IsEnum(Role)
  role: Role;
}

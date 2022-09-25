import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(4)
  @ApiProperty()
  password: string;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @MinLength(4)
  @ApiProperty()
  password: string;

  @MinLength(3)
  @MaxLength(10)
  @ApiProperty()
  name: string;
}
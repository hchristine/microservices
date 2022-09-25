import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @MinLength(2)
  @MaxLength(15)
  @ApiProperty()
  title: string;

  @MinLength(5)
  @MaxLength(100)
  @ApiProperty()
  description: string;

  @Min(1)
  @ApiProperty()
  price: number;

  @Min(1)
  @ApiProperty()
  qty: number;
}
import { IsInt, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";


export class GetOrderByQuery {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  productId: number;
}
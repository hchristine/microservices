import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min } from "class-validator";

export class CreateOrderDto {
  @IsNumber()
  @ApiProperty()
  productId: number;

  @Min(1)
  @ApiProperty()
  qty: number;
}

export class CreateOrderFullDto extends CreateOrderDto {
  @IsInt()
  userId: number;
}

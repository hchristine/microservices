import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
  @IsNumber()
  @ApiProperty()
  userId: number;

  @IsNumber()
  @ApiProperty()
  orderId: number;

  @IsString()
  @ApiProperty()
  productName: string;

  @IsNumber()
  @ApiProperty()
  qty: number;
}
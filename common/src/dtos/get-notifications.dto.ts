import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class GetNotificationsDto {
  @IsNumber()
  @ApiProperty()
  userId: number;
}
import { IsInt, IsOptional } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class GetFeedbacksQueryDto {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  productId?: number;
}

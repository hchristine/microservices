import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  text: string;

  @IsNumber()
  @ApiProperty()
  productId: number;

  @Min(1)
  @Max(5)
  @ApiProperty()
  star: number;
}

export type Dto = {
  productId: number;
  text?: string;
  userId: number;
  star: number;
};

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  CreateFeedbackDto,
  GetFeedbacksQueryDto,
} from 'microservices-hk-common';
import { AuthRequired } from 'src/decorators/auth-required.decorator';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { FeedbacksService } from './feedbacks.service';

@ApiTags('Feedbacks')
@ApiBearerAuth()
@Controller('feedbacks')
@AuthRequired()
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  create(@CurrentUserId() userId: number, @Body() dto: CreateFeedbackDto) {
    return this.feedbacksService.create(userId, dto);
  }

  @Get()
  get(@CurrentUserId() userId: number, @Query() query: GetFeedbacksQueryDto) {
    return this.feedbacksService.get(userId, query);
  }
}

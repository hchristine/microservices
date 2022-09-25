import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateFeedbackDto,
  CREATE_FEEDBACK,
  GET_FEEDBACK,
  GetFeedbacksQueryDto,
} from 'microservices-hk-common';
import { FEEDBACKS_SVC } from './constants';

@Injectable()
export class FeedbacksService {
  constructor(
    @Inject(FEEDBACKS_SVC) private readonly feedbacksProxy: ClientProxy,
  ) {}

  create(userId: number, dto: CreateFeedbackDto) {
    const payload = { ...dto, userId };
    return this.feedbacksProxy.send<Record<string, any>>(
      CREATE_FEEDBACK,
      payload,
    );
  }

  get(userId: number, query: GetFeedbacksQueryDto) {
    return this.feedbacksProxy.send(GET_FEEDBACK, { userId, query });
  }
}

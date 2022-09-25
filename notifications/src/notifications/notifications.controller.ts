import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CREATE_NOTIFICATION,
  CreateNotificationDto,
  GET_NOTIFICATIONS,
  GetNotificationsDto,
} from 'microservices-hk-common';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern(CREATE_NOTIFICATION)
  create(dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @MessagePattern(GET_NOTIFICATIONS)
  get(dto: GetNotificationsDto) {
    return this.notificationsService.get(dto);
  }
}

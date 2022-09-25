import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateNotificationDto,
  GetNotificationsDto,
} from 'microservices-hk-common';
import { Notification } from './entity/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification)
    private notificationModel: typeof Notification,
  ) {}

  async create(dto: CreateNotificationDto) {
    await this.notificationModel.create({
      userId: dto.userId,
      orderId: dto.orderId,
      message: `Thank you for ordering ${dto.productName} ${dto.qty}`,
    });
  }

  get(dto: GetNotificationsDto) {
    return this.notificationModel.findAll({
      where: {
        userId: dto.userId,
      },
    });
  }
}

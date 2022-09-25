import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GET_NOTIFICATIONS } from 'microservices-hk-common';
import { NOTIFICATIONS_SVC } from './constants';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_SVC)
    private readonly notificationsProxy: ClientProxy,
  ) {}

  get(userId: number) {
    return this.notificationsProxy.send(GET_NOTIFICATIONS, { userId });
  }
}

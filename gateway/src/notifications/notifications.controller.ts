import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'src/decorators/auth-required.decorator';
import { CurrentUserId } from 'src/decorators/current-user-id.decorator';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@AuthRequired()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  get(@CurrentUserId() userId: number) {
    return this.notificationsService.get(userId);
  }
}

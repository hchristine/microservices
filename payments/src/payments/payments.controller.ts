import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  USER_CREATED,
  CHARGE_PAYMENT,
  ChargeDto,
  OnUserCreatedDto,
} from 'microservices-hk-common';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(USER_CREATED)
  onUserCreated(dto: OnUserCreatedDto) {
    return this.paymentsService.createCustomer(dto.email);
  }

  @MessagePattern(CHARGE_PAYMENT)
  charge(dto: ChargeDto) {
    return this.paymentsService.charge(dto.amount, dto.email);
  }
}

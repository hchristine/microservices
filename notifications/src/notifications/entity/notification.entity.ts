import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Notification extends Model {
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  orderId: number;

  @AllowNull(false)
  @Column
  message: string;
}

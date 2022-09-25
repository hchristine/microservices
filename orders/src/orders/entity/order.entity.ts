import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Order extends Model {
  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @Column
  productId: number;

  @AllowNull(false)
  @Column
  qty: number;

  @AllowNull(false)
  @Column
  overallPrice: number;
}

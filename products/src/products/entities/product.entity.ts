import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
  @AllowNull(false)
  @Column
  title: string;

  @AllowNull(false)
  @Column
  description: string;

  @AllowNull(false)
  @Column
  price: number;

  @AllowNull(false)
  @Column
  qty: number;
}

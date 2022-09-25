import { AllowNull, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  password: string;
}

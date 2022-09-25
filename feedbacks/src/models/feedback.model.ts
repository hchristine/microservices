import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../db/database";

export class Feedback extends Model<InferAttributes<Feedback>, InferCreationAttributes<Feedback>> {
  declare text?: CreationOptional<string>;
  declare productId: number;
  declare userId: number;
  declare star: number;
}


Feedback.init({
  text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  star: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
  { sequelize }
);

import { sequelize } from "./database";

export async function connect() {
  await sequelize.authenticate();
  await sequelize.sync();
}

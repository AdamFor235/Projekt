import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
console.log({
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD_EXISTS: !!process.env.DB_PASSWORD
});
const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
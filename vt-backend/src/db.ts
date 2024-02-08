import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.PORT),
  models: [__dirname + '/../models']
});

export default sequelize;

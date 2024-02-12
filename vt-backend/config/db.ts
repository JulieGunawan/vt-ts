import dotenv from 'dotenv';
import {Dialect,Sequelize} from 'sequelize';

dotenv.config();

const dbName = process.env.POSTGRES_DB as string;
const dbUser = process.env.POSTGRES_USER as string;
const dbPass = process.env.POSTGRES_PASSWORD;
const dbDriver = 'postgres' as Dialect;
const dbHost = process.env.HOST;
const dbPort = Number(process.env.PORT);

const db = new Sequelize(
  dbName,
  dbUser,
  dbPass,
  {
    host: dbHost,
    dialect: dbDriver,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export default db;
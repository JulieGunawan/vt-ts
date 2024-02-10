import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';
// import Blog from "../models/Blog";

dotenv.config();

// const database = new Sequelize("vividtheory", "postgres", "postgres", {
//   database: process.env.POSTGRES_DB,
//   dialect: 'postgres',
//   username: process.env.POSTGRES_USER,
//   password: process.env.POSTGRES_PASSWORD,
//   host: process.env.HOST,
//   port: Number(process.env.PORT),
//   models: [__dirname + '/../models'],
// //   models: [Blog],
//   logging: false,
// });

const dbName = process.env.POSTGRES_DB as string;
const dbUser = process.env.POSTGRES_USER as string;
const dbPass = process.env.POSTGRES_PASSWORD;
const dbDriver = 'postgres' as Dialect;
const dbHost = process.env.HOST;
const dbPort = Number(process.env.PORT);

const database = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDriver
})

export default database;

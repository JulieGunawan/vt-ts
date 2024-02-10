"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
// import Blog from "../models/Blog";
dotenv_1.default.config();
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
const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbPass = process.env.POSTGRES_PASSWORD;
const dbDriver = 'postgres';
const dbHost = process.env.HOST;
const dbPort = Number(process.env.PORT);
const database = new sequelize_1.Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDriver
});
exports.default = database;

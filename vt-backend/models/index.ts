// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const {Sequelize, Model, DataTypes} = require('sequelize');
// const { ProcessEnv } = require('process');
import * as fs from 'fs';
import * as path from 'path';
import { Sequelize, Model, DataTypes } from 'sequelize';
import process from 'process';

const basename:string = path.basename(__filename);
const env:string = process.env.NODE_ENV || 'development';
const config:any = require(path.join(__dirname + '/../config/config.json'))[env];
const db:any = {};

let sequelize: Sequelize;
if (config.use_env_variable && process.env[config.use_env_variable]) {
  sequelize = new Sequelize(process.env[config.use_env_variable]!, config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.tsx' &&
      file.indexOf('.test.tsx') === -1
    );
  })
  .forEach((file:string) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
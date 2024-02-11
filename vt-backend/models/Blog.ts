'use strict';
import {Model, DataTypes} from 'sequelize';
import db from '../config/db';

interface BlogAttributes {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  image: string | null;
  published_at: Date | null;
  deleted_at: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Blog extends Model<BlogAttributes> {};

Blog.init(
  {
    id: {
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type:DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    published_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize: db,
    tableName: 'Blogs'
  }
);
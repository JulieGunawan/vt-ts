'use strict';
import {Model, DataTypes} from 'sequelize';
import database from '../src/db';

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
// module.exports = (sequelize:any, DataTypes:any) => {
 export class Blog extends Model<BlogAttributes> implements BlogAttributes {
    //  * Helper method for defining associations.
    //  * This method is not a part of Sequelize lifecycle.
    //  * The `models/index` file will call this method automatically.
    id!: number;
    title!: string;
    slug!: string;
    content!: string | null;
    image!: string | null;
    published_at!: Date | null;
    deleted_at!: Date | null;
    createdAt!: Date;
    updatedAt!: Date;
    static associate(models:any) {
      // define association here
    }
  };

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
      sequelize: database,
      modelName: 'Blog',
      tableName: 'Blogs'
    }
  );
  // return Blog;
// };
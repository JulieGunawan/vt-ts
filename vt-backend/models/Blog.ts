import {Table, Column, Model, DataType, CreatedAt, UpdatedAt} from 'sequelize-typescript';
import sequelize from '../src/db';

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

// class Blog extends Model<BlogAttributes> implements BlogAttributes {} 
@Table({
  timestamps: true,
  tableName: 'Blogs',
  modelName: 'Blog',
})

class Blog extends Model {
  @Column (
  {
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  declare  id:number;
      
  @Column ({
    type: DataTypes.STRING,
    allowNull: false,
  })
  declare title:string;

  @Column ({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare slug: string
      
  @Column ({
    type: DataType.TEXT,
  }) 
  declare content: string;
  
  @Column ({
    type: DataType.STRING,
  })
  declare image: string;

  @Column ({
    type: DataType.DATE,
  })
  declare published_at: Date;
  
  @Column ({
    type: DataType.DATE,
  })
  declare deleted_at: Date;
    
  @CreatedAt
  declare createdAt: Date;
    
  @UpdatedAt
  declare updatedAt: Date;
    
};

export default Blog;

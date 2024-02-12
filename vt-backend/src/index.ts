import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import db from '../config/db';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import path  from 'path';
import {Blog} from '../models/Blog';
import { Op } from 'sequelize';
// import router from'../routes/blogs';
dotenv.config();

//test DB
const connectToDB = async() => {
  await db
    .authenticate()
    .then(() => {
      console.log('Database connected');
    })
    .catch((err) => {
      console.log('Error: ' + err.message);
    });
  };
  
//create express app
const app = express();

// middleware
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes for blogs API calls
// app.use('/blogs', router);



app.get('/blogs', async (req, res) =>{
  try{
    const limit:number = req.query?.limit ? Number(req.query.limit) : 6;
    const page:number = req.query?.page ? Number(req.query.page) : 1;
    const startIndex = (page - 1) * limit;

    console.log(limit);
    const records = await Blog.findAll({
      order: [['published_at', 'DESC']],
      limit: limit,
      offset: startIndex,
      where: {
        deleted_at: {
          [Op.is]: null,
        },
        published_at: {
          [Op.ne]: null,
        },
      },
    });
    return res.json(records);
  } catch (e){
    return res.json({msg:'fail to read', status: 500, route: '/blogs'});
  }
});



app.get('/blogs/getBySlug/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({
      where: {
        slug: req.params.slug as string,
        deleted_at: {
          [Op.is]: null,
        },
        published_at: {
          [Op.ne]: null,
        },
      },
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err:any) {
    console.log(err.message);
  }
});

app.get('/blogs/getById/:id', async (req, res) => {
  try {
    console.log('here', req.params.id);
    const blog = await Blog.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (err:any) {
    console.log(err.message);
  }
});

app.get('/blogs/random', async (req, res) => {
  try {
    console.log('random part');
    const randomBlogs = [];
    const usedIds = new Set();

    while (randomBlogs.length < 4) {
      // Ensure we have 4 unique blogs
      const randomId = Math.floor(Math.random() * 20) + 1;

      if (!usedIds.has(randomId)) {
        console.log('random id is', randomId);
        const blog = await Blog.findOne({
          where: {
            id: randomId,
          },
        });

        if (blog) {
          randomBlogs.push(blog);
          usedIds.add(randomId);
        }
      }
    }
    if (randomBlogs.length > 0) {
      res.json(randomBlogs);
    } else {
      res.status(404).json({ message: 'Blogs not found' });
    }
  } catch (err:any) {
    console.log(err.message);
  }
});

app.put('/blogs/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log("id is",req.params.id);
    res.json(updatedBlog);
  } catch (err) {
    console.log(err);
  }
});

app.post('/blogs', async (req, res)  => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (err) {
    console.log(err);
  }
});
const PORT = 5000;

app.listen(PORT, () => {
  connectToDB();
  console.log(`server running on port ${PORT}`);
});

// Synchronize models with the database
// database
//   .sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err) => {
//     console.error('Error synchronizing database:', err);
//   });

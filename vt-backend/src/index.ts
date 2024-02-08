// import express, { Express, Request, Response } from 'express';
import express from 'express';
import cors from 'cors';
// import database from './db.js';
import dotenv from 'dotenv';
// import { Sequelize } from 'sequelize-typescript';
import path from 'path';
// import router from '../routes/blogs.js';

dotenv.config();

// //test DB
// const connectToDB = async() => {
//   await database
//     .authenticate()
//     .then(() => {
//       console.log('Database connected');
//     })
//     .catch((err:any) => {
//       console.log('Error: ' + err.message);
//     });
//   };
  
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


// Serve frontend
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../vt-frontend/build')));

//   app.get('*', (req:Request, res:Response) =>
//     res.sendFile(
//       path.resolve(__dirname, '../', 'vt-frontend', 'build', 'index.html')
//     )
//   );
// } else {
//   app.get('/', (req:Request, res:Response) => res.send('Please set to production'));
// }

// app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // connectToDB();
  console.log(`server running on port ${PORT}`);
});

// Synchronize models with the database
// database
//   .sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch((err:any) => {
//     console.error('Error synchronizing database:', err);
//   });

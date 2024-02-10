
import express from 'express';
import dotenv from 'dotenv';
import db from '../models';
import cors from 'cors';
// import router from '../routes/blogs';
import database from './db';

const app = express();
const PORT = 5000;

const connectToDB = async() => {
  await database
    .authenticate()
    .then(() => {
      console.log('Database connected');
    })
    .catch((err:any) => {
      console.log('Error: ' + err.message);
    });
  };

// middleware
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes for blogs API calls
// app.use('/blogs', router);

app.get('/blogs', (req, res) => {
  db.Blog.findAll()
  .then(
    (result:object) => res.json(result)).catch((err:object)=>
    console.log(err)
  );
}
);


// db.sequelize.sync()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })

app.listen(PORT, () => {
  connectToDB();
  console.log(`server running on port ${PORT}`);
});
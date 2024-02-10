// // import {Request, Response} from 'express';
// import { RequestHandler, Request, Response} from 'express';
// import Blog from '../models/Blog';
// import db from '../models';
// import { Op } from 'sequelize';

// // interface BlogAttributes {
// //   id: number;
// //   title: string;
// //   slug: string;
// //   content: string | null;
// //   published_at: Date | null;
// //   createdAt: Date;
// //   updatedAt: Date;
// //   deleted_at: Date | null;
// // }

// export const getAllBlogs:RequestHandler= async (req: Request, res: Response) => {
//     // const page:number = parseInt(req.query.page as string) || 1;
//     // const limit:number = parseInt(req.query.limit as string) || 6;
//     // const startIndex:number = (page - 1) * limit;

//     // try {
//     //   const allBlogs: Blog[] = await Blog.findAll({
//     //     order: [['published_at', 'DESC']],
//     //     limit: limit,
//     //     offset: startIndex,
//     //     where: {
//     //       deleted_at: {
//     //         [Op.is]: null,
//     //       },
//     //       published_at: {
//     //         [Op.ne]: null,
//     //       },
//     //     },
//     //   });

//     //   res.json(allBlogs);
//     // } catch (err:any) {
//     //   console.log(err.message);
//     // }
//     // var blogs = await db.Blog.findAll();
//     db.Blog.findAll()
//   .then(
//     (result:object) => res.json(result)).catch((err:object)=>
//     console.log(err)
//   );
//     // return res.status(200).json({message:"fetch successfully", data:blogs});
//   }

//   // app.get('/', (req, res) => {
// //   db.Blog.findAll()
// //   .then(
// //     (result:object) => res.json(result)).catch((err:object)=>
// //     console.log(err)
// //   );
// // }
// // );


// //   export const getBlogBySlug:RequestHandler= async (req:Request, res:Response) => {
// //     try {
// //       const blog:Blog | null = await Blog.findOne({
// //         where: {
// //           slug: req.params.slug,
// //           deleted_at: {
// //             [Op.is]: null,
// //           },
// //           published_at: {
// //             [Op.ne]: null,
// //           },
// //         },
// //       });
// //       if (blog) {
// //         res.json(blog);
// //       } else {
// //         res.status(404).json({ message: 'Blog not found' });
// //       }
// //     } catch (err:any) {
// //       console.log(err.message);
// //     }
// //   }
  
// //   export const getBlogById:RequestHandler= async (req:Request, res:Response) => {
// //     try {
// //       console.log('here', req.params.id);
// //       const blog:Blog | null = await Blog.findOne({
// //         where: {
// //           id: req.params.id,
// //           deleted_at: {
// //             [Op.is]: null,
// //           },
// //           published_at: {
// //             [Op.ne]: null,
// //           },
// //         },
// //       });
// //       if (blog) {
// //         res.json(blog);
// //       } else {
// //         res.status(404).json({ message: 'Blog not found' });
// //       }
// //     } catch (err:any) {
// //       console.log(err.message);
// //     }
// //   }
  
// //   export const getRandomBlogs:RequestHandler= async (req:Request, res:Response) => {
// //     try {
// //       console.log('random part');
// //       const randomBlogs: Blog[] = [];
// //       const usedIds:Set<number> = new Set();

// //       while (randomBlogs.length < 4) {
// //         // Ensure we have 4 unique blogs
// //         const randomId = Math.floor(Math.random() * 20) + 1;

// //         if (!usedIds.has(randomId)) {
// //           console.log('random id is', randomId);
// //           const blog:Blog | null = await Blog.findOne({
// //             where: {
// //               id: randomId,
// //               deleted_at: {
// //                 [Op.is]: null,
// //               },
// //               published_at: {
// //                 [Op.ne]: null,
// //               },
// //             },
// //           });

// //           if (blog) {
// //             randomBlogs.push(blog);
// //             usedIds.add(randomId);
// //           }
// //         }
// //       }
// //       if (randomBlogs.length > 0) {
// //         res.json(randomBlogs);
// //       } else {
// //         res.status(404).json({ message: 'Blogs not found' });
// //       }
// //     } catch (err:any) {
// //       console.log(err.message);
// //     }
// //   }

// //   export const createOneBlog:RequestHandler= async (req:Request, res:Response) => {
// //     try {
// //       const newBlog:Blog = await Blog.create(req.body);
// //       res.json(newBlog);
// //     } catch (err:any) {
// //       console.log(err);
// //     }
// //   }

// //   export const updateOneBlog:RequestHandler= async (req:Request, res:Response) => {
// //     try {
// //       const id= parseInt(req.params.id);

// //       const [affectedRowsCount] = await Blog.update(req.body, {
// //         where: {
// //           id: id,
// //         },
// //       });

// //       if (affectedRowsCount > 0) {
// //         // Fetch the updated blog record
// //         const updatedBlog = await Blog.findByPk(id);
  
// //         if (updatedBlog) {
// //           res.json(updatedBlog);
// //         } else {
// //           // Handle case where the blog record was not found after update
// //           res.status(404).json({ message: 'Blog not found after update' });
// //         }
// //       } else {
// //         // Handle case where no rows were affected by the update
// //         res.status(404).json({ message: 'No blog was updated' });
// //       }
      
// //     } catch (err:any) {
// //       console.log(err);
// //       res.status(500).json({ message: 'Internal server error' });
// //     }
// //   }


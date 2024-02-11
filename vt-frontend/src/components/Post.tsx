import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './Header';
import DeleteSection from './DeleteSection';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Blog } from './Blog.types';

const Post:React.FC = () => {
  const [articles, setArticles] = useState<Blog|null>(null);
  const [randomBlogs, setRandomBlogs] = useState<Blog[]>([]);
  const { name } = useParams<string>();
  const getBlogs = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/blogs/getBySlug/${name}`,
      );
      const data:Blog = await response.json();
      setArticles(data);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const generateRandomBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/blogs/random');
      const randomData:Blog[] = await response.json();
      setRandomBlogs(randomData);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBlogs();
    generateRandomBlogs();
  }, [name]);

  return (
    <>
      <Container maxWidth="lg">
        <Header />
        <h1>{articles? articles.title:"article not found"}</h1>
        <div dangerouslySetInnerHTML={articles? { __html: articles.content }: { __html: <p>article not found</p> }} />
        <p>
          Published at:{' '}
          {articles? new Date(articles.published_at as Date).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }) : ''}
        </p>
        <DeleteSection />
        <Box
          component="span"
          sx={{
            display: 'block',
            backgroundColor: 'white',
            padding: '20px',
            marginTop: '35px',
          }}
        >
          <h3>You Might Also Like</h3>
          <Grid container spacing={2}>
            {randomBlogs.map((post:Blog) => {
              return (
                <Grid item xs={12} md={6} lg={3} key={post.id}>
                  <Link className="list-item" to={`/${post.slug}`}>
                    <div className="blog-post">
                      <h3>{post.title}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content.substring(0, 150) + '...',
                        }}
                      />
                      <p>
                        Published at:{' '}
                        {new Date(post.published_at as Date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </p>
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Post;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Dialog from './Dialog';
import Header from './Header';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Blog, DialogState } from './Blog.types';



const DeleteBlogPage:React.FC = () => {
  const [article, setArticle] = useState<Blog|null>(null);
  const { slug } = useParams<string>();

  const [dialog, setDialog] = useState<DialogState>({
    message: '',
    isLoading: false,
  });
  const [empty, setEmpty] = useState<boolean>(false);

  const renderBlog = async () => {
    try {
      console.log(slug);
      const response = await fetch(
        `http://localhost:5000/blogs/getBySlug/${slug}`,
      );
      const data = await response.json();
      setArticle(data);
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const removeBlog = async (id:number) => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deleted_at: new Date() }),
      });

      if (response.ok) {
        alert('Blog is succesfully deleted');
        setArticle(null);
      } else {
        console.error('Failed to delete blog');
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    renderBlog();
  }, [dialog]);

  const handleDialog = (message: string, isLoading:boolean) => {
    setDialog({ message, isLoading });
  };

  const handleDelete = () => {
    handleDialog('Are you sure you want to delete this post?', true);
    setEmpty(true);
  };

  const areYouSureDelete = (confirmed:boolean) => {
    if (confirmed) {
      handleDialog('', false);
      if (article){
        const blogId :number = article.id;
        console.log(blogId);
        removeBlog(blogId);
        setArticle(null);
      }
    } else {
      handleDialog('', false);
    }
  };

  if (!article) {
    console.log('article not found');
    return (
      <div>
        <Header />
        <p>Post not found</p>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
            <div className="deletePost">
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
            <p>
              Published at:{' '}
              {new Date(article.published_at as Date).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
            <Box display="flex" justifyContent="space-between">
              {empty ? (
                <Link to="/">
                  <Button variant="contained">Back</Button>
                </Link>
              ) : (
                <Button onClick={handleDelete} variant="contained" color="error">
                  Delete
                </Button>
              )}
              <Link to="/">
                <Button variant="contained">Cancel</Button>
              </Link>
            </Box></div> 
        
        {dialog.isLoading && (
          <Dialog message={dialog.message} onConfirm={areYouSureDelete} />
        )}
      </div>
    )};
};

export default DeleteBlogPage;

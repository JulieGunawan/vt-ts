import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Blog } from './Blog.types';

const SearchBar:React.FC<Blog> = () => {
  const [input, setInput] = useState<string>('');
  const [articles, setArticles] = useState<Blog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(true);
  const [isAtBeginning, setIsAtBeginning] = useState<boolean>(true);
  const [error,setError] = useState<null | string>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    console.log(input);
    setPage(1);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const renderBlogs = async () => {
      try {
        if (!input) {
          setArticles([]);
          setIsAtEnd(true);
          setIsAtBeginning(true);
        } else {
          const response = await fetch(
            `http://localhost:5000/blogs?page=${page}&limit=7`,
          );
          const data = await response.json();

          const newData = data.filter(
            (post:Blog) =>
              post.title.toLowerCase().includes(input.toLowerCase()) &&
              post.deleted_at == null &&
              post.published_at != null,
          );

          setArticles(newData);
          setIsAtEnd(newData.length < 6); // Check if there are less than 6 items on the current page
          setIsAtBeginning(page === 1);
        }
      } catch (err:any) {
          setError((err as Error).message);
          console.log(error);
      }
    };
    renderBlogs();
  }, [input, page]);

  return (
    <>
      <div className="searchBar">
        <form>
          <FaSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Search..."
            value={input}
            onChange={handleChange}
          />
        </form>
      </div>
      <div>
        <div className="searchPage">
          <h2>Search Results:</h2>
          <Grid container spacing={2}>
            {articles.map((post:Blog) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={post.id}>
                <Link className="list-result" to={`/${post.slug}`}>
                  <h3>{post.title}</h3>
                  <div
                    className="searchContent"
                    dangerouslySetInnerHTML={{
                      __html: post.content.substring(0, 150) + '...',
                    }}
                  />
                  <div>
                    Published at:{' '}
                    {new Date(post.published_at as Date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
          <Box display="flex" justifyContent="space-between">
            {!isAtBeginning && (
              <Button variant="contained" onClick={previousPage}>
                PREV
              </Button>
            )}
            {!isAtEnd && (
              <Button variant="contained" onClick={nextPage}>
                NEXT
              </Button>
            )}
          </Box>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
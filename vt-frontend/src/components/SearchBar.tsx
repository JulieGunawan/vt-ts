import React, { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface IPost {
  id:number;
  slug:string;
  title:string;
  content:string;
  published_at?:Date | string;
  deleted_at?:Date;
}
//https://www.youtube.com/watch?v=FJDVKeh7RJI&t=1032s
const SearchBar:React.FC<IPost> = ({id, slug, title, content}) => {
  
  const [input, setInput] = useState<string>('');
  const [articles, setArticles] = useState<IPost[] >([]);
  const [page, setPage] = useState<number>(1);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(true);
  const [isAtBeginning, setIsAtBeginning] = useState<boolean>(true);
  const [error,setError] = useState<null | string>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
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
            `http://localhost:5000/blogs?page=${page}&limit=6`,
          );
          const data = await response.json();

          const newData = data.filter(
            (post:IPost) =>
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
            {articles.map((post:IPost) => (
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
                    {new Date(post.published_at as string).toLocaleString('en-US', {
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

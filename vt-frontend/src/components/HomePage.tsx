import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

const HomePage = () => {
  const publishedAt=null;
  const deletedAt=null;
  return (
    <div className="homePage">
      <Header />
      <h1>Blogs</h1>
      <SearchBar id={0} slug="" title="" content="" published_at={publishedAt} deleted_at={deletedAt}/>
    </div>
  );
};

export default HomePage;
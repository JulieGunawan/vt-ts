import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <h1>Blogs</h1>
      <SearchBar />
    </div>
  );
};

export default HomePage;

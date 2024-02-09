import React from 'react';
import Header from './Header';
// import SearchBar from './SearchBar';

const HomePage = () => {
  return (
    <div className="homePage">
      <Header />
      <h1>Blogs</h1>
      {/* <SearchBar id={0} slug="" title="" content=""/> */}
    </div>
  );
};

export default HomePage;

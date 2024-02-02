import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPostForm from '../pages/BlogPostForm';
import UserForm from '../pages/UserForm';
import SearchPage from '../pages/SearchPage'; 
import Home from '../pages/Home'; 

function Main() {
  return (
    <main>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/blogpostform" element={<BlogPostForm />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/UserForm" element={<UserForm />} />
      </Routes>
    </main>
  );
}

export default Main;

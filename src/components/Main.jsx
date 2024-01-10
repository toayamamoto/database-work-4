// components/Main.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogPostForm from '../pages/BlogPostForm';
import UserForm from '../pages/UserForm';
import SearchPage from '../pages/SearchPage'; // Import the new SearchPage component

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/blogpostform" element={<BlogPostForm />} />
        <Route path="/userform" element={<UserForm />} />
        <Route path="/search" element={<SearchPage />} /> {/* Add the new route for SearchPage */}
      </Routes>
    </main>
  );
}

export default Main;

// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BlogPostForm from "./pages/BlogPostForm";
import UserForm from "./pages/UserForm";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import SearchPage from "./pages/SearchPage"; // 追加

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Main>
          <Routes>
            <Route path="/blogpostform" element={<BlogPostForm />} />
            <Route path="/userform" element={<UserForm />} />
            <Route path="/search" element={<SearchPage />} /> {/* 追加 */}
          </Routes>
        </Main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

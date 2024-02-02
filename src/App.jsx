import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Main/>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

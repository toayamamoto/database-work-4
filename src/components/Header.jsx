import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <header className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">My Blog Platform</h1>
          <nav className="navbar">
            <div className="navbar-start">
            <Link to="/Home" className="navbar-item">Home</Link>
              {}            
              <Link to="/blogpostform" className="navbar-item">Blog Post Form</Link>
              {}
              <Link to="/search" className="navbar-item">Blogs</Link> 
              {}
              <Link to="/userform" className="navbar-item">User Form</Link> 
              {}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
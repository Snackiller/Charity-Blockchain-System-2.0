import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/NavBar.css';

function NavBar() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="nav-bar">
      <span>ByteCoin</span>
      {!isAuthPage && (
        <div className="button-container">
          <Link to="/home">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/logout">Logout</Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;

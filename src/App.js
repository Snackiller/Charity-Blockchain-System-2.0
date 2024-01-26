// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/js/Login';
import Register from './pages/js/Register';
import Home from './pages/js/Home';
import CreatePage from './pages/js/CreatePage';
import DonationPage from './pages/js/DonationPage';
import NavBar from './pages/js/NavBar';
import Logout from './pages/js/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn && <NavBar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={isLoggedIn ? <CreatePage /> : <Navigate to="/login" />} />
        <Route path="/donation/:charityName" element={isLoggedIn ? <DonationPage /> : <Navigate to="/login" />} />
        <Route path="/logout" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

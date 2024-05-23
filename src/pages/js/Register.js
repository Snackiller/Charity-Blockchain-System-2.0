import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../css/Register.css';

// Register functional component definition
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Function to handle the registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to register a new user
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (response.ok) {
        console.log('Registration successful');
        navigate('/login');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Return statement of the Register component
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
}

export default Register;

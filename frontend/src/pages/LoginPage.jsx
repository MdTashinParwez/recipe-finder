// src/pages/LoginPage.jsx

import React, { useState } from 'react';
// Import the shared styles.
import './AuthForm.css';

import { login } from '../services/authService';

const LoginPage = () => {
  // State for email and password.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // The exact same generic handler works here because it's based on the input's 'name' attribute.

  const [error, setError] = useState(null);

  const handleChange = (e) => {
  if(error) setError(null);

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The submit handler will log the login data.
  const handleSubmit = async (e) => {
    e.preventDefault();
   setError(null);
   try {
    const data = await login(formData);
    console.log('Login successful!', data);
  } catch (error) {
    console.error(error);
    setError(error.message || 'An Unexpected Error Occurred, Please Try Again Later ! Thanks for your patience ☺️. ');
    
   }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
                {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
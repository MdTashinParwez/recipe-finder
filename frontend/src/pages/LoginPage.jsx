// src/pages/LoginPage.jsx

import React, { useState } from 'react';
// Import the shared styles.
import './AuthForm.css';

const LoginPage = () => {
  // State for email and password.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // The exact same generic handler works here because it's based on the input's 'name' attribute.
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The submit handler will log the login data.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);
    // Here we will eventually call our login service.
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        
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
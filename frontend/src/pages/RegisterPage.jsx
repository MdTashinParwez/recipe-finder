import React, { useState } from 'react'
import { register } from '../services/authService';

function RegisterPage() {
    const [ formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

     const [error, setError] = useState(null);

    const handleChange = (e) => {
      if(error) setError(null);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {   
        e.preventDefault();
        setError(null);

        // Registration logic will go here
        try {
          const data = await register(formData);
          console.log('Registration successful! and now you can log in.', data);
       
        } catch (error) {
          console.error(error);
          setError(error.message || 'An Unexpected Error Occurred, Please Try Again Later ! Thanks for your patience ☺️. ');
          
        }
    };
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        
         {error && <p className="error-message">{error}</p>}
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name" // The 'name' attribute MUST match the key in our `formData` state.
            placeholder="Enter your name"
            value={formData.name} // The input's value is controlled by our state.
            onChange={handleChange} // The input's change event is handled by our function.
            required
          />
        </div>

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">Register</button>
      </form>
    </div>
  )
}

export default RegisterPage

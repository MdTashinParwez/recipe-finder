import React, { useState } from 'react'

function RegisterPage() {
    const [ formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create an Account</h2>
        
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

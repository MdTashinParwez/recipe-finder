import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (error) setError(null);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {   
        e.preventDefault();
        setError(null);

        if (formData.name.trim().length < 3) {
            setError("Name must be at least 3 characters");
            return;
        }

        if (!formData.email.includes("@")) {
            setError("Enter a valid email");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        try {
            await register(formData);

            navigate('/login', {
                state: { message: "Registration successful! Please login." }
            });

        } catch (error) {
            setError(
                error?.response?.data?.message ||
                error?.message ||
                'Something went wrong'
            );
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 
        bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')] 
        bg-cover bg-center">

           
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

            
            <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 text-white z-20">
                <h1 
                    className="text-xl font-bold cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    🍳 Delishia
                </h1>

                <button
                    onClick={() => navigate('/login')}
                    className="bg-white/20 px-4 py-1 rounded-lg hover:bg-white/30 transition"
                >
                    Login
                </button>
            </div>

           
            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

                <h2 className="text-3xl font-bold text-center mb-2">
                    Create Account 🍰
                </h2>

                <p className="text-center text-white/80 mb-6">
                    Join and explore amazing recipes
                </p>

                {error && (
                    <p className="bg-red-500/20 text-red-300 text-sm p-2 rounded mb-4 text-center">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                            placeholder-white/70 text-white focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                            placeholder-white/70 text-white focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg 
                            placeholder-white/70 text-white focus:ring-2 focus:ring-orange-400 outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold 
                        hover:bg-orange-600 transition duration-200"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-white/80 mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-orange-400 font-medium cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>

            </div>

          
            <div className="absolute bottom-4 w-full text-center text-white/70 text-sm z-20">
                © {new Date().getFullYear()} Delishia • Made by Tashin
            </div>

        </div>
    );
}

export default RegisterPage;
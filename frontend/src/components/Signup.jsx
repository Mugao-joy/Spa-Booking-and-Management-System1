import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/auth/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'X-CSRFToken': 'your-csrf-token-here'  // Include this if CSRF is enabled
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });
    
            if (response.ok) {
                // After successful signup, redirect to landing page
                navigate('/');
            } else {
                const data = await response.json();
                setError(JSON.stringify(data)); // Display the actual error message
            }
        } catch (error) {
            setError('An error occurred during signup.');
        }    
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Name</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded mt-4 hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/login')}
                    >
                        Log in here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup
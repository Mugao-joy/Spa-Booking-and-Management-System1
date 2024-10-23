import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/jwt/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            if (response.ok) {
                // Redirect to a protected page or dashboard after successful login
                navigate('/');
            } else {
                const data = await response.json();
                setError('Login failed: ' + (data.detail || 'Invalid credentials'));
            }
        } catch (error) {
            setError('An error occurred during login.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            placeholder="Enter your username"
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
                        Log In
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <button
                        className="text-blue-500 hover:underline"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;

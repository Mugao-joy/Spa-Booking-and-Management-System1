import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
    //const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (authToken) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
            axios
                .get('http://127.0.0.1:8000/auth/users/me/')
                .then((response) => setUser(response.data))
                .catch(() => setUser(null)); // Clear user on error
        } else {
            setUser(null); // Clear user if token is not present
        }
    }, [authToken]);

    const login = async ({ username, password }) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
                username,
                password,
            });

            const { access, refresh } = response.data;
            localStorage.setItem('authToken', access);
            localStorage.setItem('refreshToken', refresh);

            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            setAuthToken(access);

            const userResponse = await axios.get('http://127.0.0.1:8000/auth/users/me/');
            setUser(userResponse.data);

            return true; // Success
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw new Error('Invalid credentials or server error.');
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        setAuthToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

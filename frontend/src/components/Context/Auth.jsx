import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if the user is logged in on mount
        axios.get('/auth/users/me/')
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        setUser({ token });
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

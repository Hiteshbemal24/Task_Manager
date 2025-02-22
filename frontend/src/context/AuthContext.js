"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as apiLogin, signup as apiSignup } from '../utils/api';
import api from '../utils/api'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser  = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await api.get('/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setUser (response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setLoading(false);
        };
        fetchUser ();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await api.get('/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser (response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        }
    };

    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password);
            localStorage.setItem('token', data.token);
            await fetchUserData(); 
            toast.success('Login successful!'); 
            router.push('/tasks');
        } catch (error) {
            console.error('Login failed:', error);
            toast.error('Login failed. Please check your credentials.'); 
        }
    };

    const signup = async (email, password) => {
        try {
            const data = await apiSignup(email, password);
            localStorage.setItem('token', data.token);
            await fetchUserData(); 
            toast.success('User  registered successfully!'); 
            
        } catch (error) {
            console.error('Signup failed:', error);
            toast.error('Signup failed. Please try again.'); 
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser (null);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
            <ToastContainer /> 
        </AuthContext.Provider>
    );
};

export default AuthContext;
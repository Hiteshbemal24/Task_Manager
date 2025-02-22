'use client';

import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const AuthForm = () => {
    const { login, signup } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isSignup) {
                if (password !== confirmPassword) {
                    setError("Passwords do not match!");
                    return;
                }
                await signup(email, password);
                setIsSignup(false);  
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            } else {
                await login(email, password);
            }
        } catch (err) {
            setError(err.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center mb-4">{isSignup ? 'Sign Up' : 'Log In'}</h2>
                {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {isSignup && (
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>
                <button
                    type="button"
                    onClick={() => setIsSignup(!isSignup)}
                    className="w-full mt-4 text-blue-500 hover:underline text-center"
                >
                    {isSignup ? 'Already have an account? Log In' : 'Create an account'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
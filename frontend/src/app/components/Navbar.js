"use client"; 
import React, { useContext } from 'react';
import Link from 'next/link';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Task Manager</h1>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="mr-4">{user.email}</span>
                        <Link href="/tasks">
                            <p className="btn">Tasks</p>
                        </Link>
                        <button onClick={logout} className="btn">
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/">
                        <p className="btn">Login</p>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
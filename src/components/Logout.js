// src/components/Logout.js
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Logout = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Error logging out:', error);
        });
    };

    return (
        currentUser && (
            <button onClick={handleLogout}>Logout</button>
        )
    );
};

export default Logout;

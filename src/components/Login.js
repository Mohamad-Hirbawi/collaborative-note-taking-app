// src/components/Login.js
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Logged in:', userCredential);
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

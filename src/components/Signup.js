// src/components/Signup.js
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('User registered:', userCredential);
            })
            .catch((error) => {
                console.error('Error signing up:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
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
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;

// src/components/Login.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: (values) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    toast.success('Logged in successfully');
                    navigate('/notes');
                })
                .catch((error) => {
                    toast.error('Error logging in: ' + error.message);
                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                ) : null}
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;

// src/components/Login.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

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
        <form onSubmit={formik.handleSubmit} className="container mt-5 login-form">
            <h2 className="mb-4">Login</h2>
            <div className="form-group mb-3">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="form-group mb-3">
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default Login;

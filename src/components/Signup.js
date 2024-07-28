// src/components/Signup.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Signup.css';

const Signup = () => {
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
            createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    toast.success('User registered successfully');
                    navigate('/notes');
                })
                .catch((error) => {
                    toast.error('Error signing up: ' + error.message);
                });
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="container mt-5 signup-form">
            <h2 className="mb-4">Signup</h2>
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
            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    );
};

export default Signup;

// src/components/Signup.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
        <form onSubmit={formik.handleSubmit}>
            <h2>Signup</h2>
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
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;

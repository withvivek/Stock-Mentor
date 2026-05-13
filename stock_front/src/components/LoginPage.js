import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api.js'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Auth.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        emailOrUsername: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            emailOrUsername: '',
            password: ''
        };

        if (!formData.emailOrUsername.trim()) {
            newErrors.emailOrUsername = 'Email or username is required';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

        if (errors[name]) {
            setErrors({...errors, [name]: ''});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            const loginData = {
                emailOrUsername: formData.emailOrUsername,
                password: formData.password
            };
            const response = await loginUser(loginData);
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            toast.success("Login Successful!", { autoClose: 1500 });
            setTimeout(() => navigate("/"), 1500);
        } catch (err) {
            toast.error("Invalid credentials, please try again.",{autoClose:1500});
            setError("Invalid credentials, please try again.");
        }
    };

    return (
        <div className="auth-page">
            <Navbar/>
            <div className="auth-container">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="auth-card">
                    <div className="logo-container">
                        <span className="app-name">Stock Mentor</span>
                    </div>
                    <h2>Welcome Back</h2>
                    <p className="subtitle">Enter your details to access your portfolio</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="emailOrUsername" 
                                className={`form-control ${errors.emailOrUsername ? 'is-invalid' : ''}`}
                                placeholder="Email or username" 
                                value={formData.emailOrUsername} 
                                onChange={handleChange} 
                            />
                            {errors.emailOrUsername && <div className="invalid-feedback">{errors.emailOrUsername}</div>}
                        </div>
                        <div className="form-group">
                            <input 
                                type="password" 
                                name="password" 
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                    <p className="auth-link">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
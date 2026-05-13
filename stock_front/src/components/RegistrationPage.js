import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/api.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Auth.css";

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });
    const [errors, setErrors] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: ''
        };

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        } else if (formData.username.length < 4) {
            newErrors.username = 'Username must be at least 4 characters';
            isValid = false;
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            isValid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one number, and one special character';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!/^[\d\s\-()+]{10,15}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});

        // Clear error when user starts typing
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
            await registerUser(formData);
            toast.success("Registration Successful!", { autoClose: 2000 });
            setTimeout(() => navigate("/login"), 2500);
        } catch (err) {
            toast.error("Registration failed. Please try again.");
            setError("Registration failed. Please try again.");
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
                    <h2>Create Account</h2>
                    <p className="subtitle">Join the elite community of stock mentors</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="username" 
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                placeholder="Username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    placeholder="First Name" 
                                    value={formData.firstName} 
                                    onChange={handleChange} 
                                />
                                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    placeholder="Last Name" 
                                    value={formData.lastName} 
                                    onChange={handleChange} 
                                />
                                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                type="email" 
                                name="email" 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                        <div className="form-group">
                            <input 
                                type="text" 
                                name="address" 
                                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                placeholder="Address" 
                                value={formData.address} 
                                onChange={handleChange} 
                            />
                            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>
                        <div className="form-group">
                            <input 
                                type="tel" 
                                name="phoneNumber" 
                                className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                placeholder="Phone Number" 
                                value={formData.phoneNumber} 
                                onChange={handleChange} 
                            />
                            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
                    </form>
                    {error && <p className="error-text">{error}</p>}
                    <p className="auth-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
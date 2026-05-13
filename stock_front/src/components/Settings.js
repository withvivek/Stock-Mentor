import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "../style/Theme.css";

const Settings = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (confirmDelete) {
            try {
                // Assuming an endpoint exists for deletion
                await axios.delete(`http://localhost:8080/api/users/${user.id}`);
                localStorage.clear();
                toast.error("Account deleted successfully.");
                navigate("/register");
            } catch (error) {
                toast.error("Failed to delete account. Please contact support.");
            }
        }
    };

    return (
        <div className="settings-page">
            <Navbar />
            <div className="container" style={{ marginTop: '50px', maxWidth: '600px' }}>
                <h1 className="page-title">Account Settings</h1>
                
                <div className="card glass" style={{ padding: '30px', marginTop: '30px' }}>
                    <div className="settings-section">
                        <h3>Profile Information</h3>
                        <p style={{ margin: '10px 0', color: 'var(--text-secondary)' }}>
                            <strong>Username:</strong> {user.username}
                        </p>
                        <p style={{ margin: '10px 0', color: 'var(--text-secondary)' }}>
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>
                    
                    <hr style={{ margin: '30px 0', opacity: 0.2 }} />

                    <div className="settings-section">
                        <h3 style={{ color: 'var(--error)' }}>Danger Zone</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="btn btn-error" onClick={handleDeleteAccount}>
                            🗑️ Delete My Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;

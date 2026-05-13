import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "../style/Theme.css";
import "../style/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (isLoggedIn && storedUsername) {
            setUsername(storedUsername);
        }
    }, [isLoggedIn]);

    const handleLogout = () => {
        localStorage.clear();
        setUsername("");
        toast.success("Logged out successfully!", { autoClose: 2000 });
        setTimeout(() => navigate("/login"), 1500);
    };

    const toggleTheme = () => {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            toast.info("Switched to Light Mode ☀️");
        } else {
            body.classList.add('dark-theme');
            toast.info("Switched to Dark Mode 🌙");
        }
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="logo" onClick={() => navigate("/")}>Stock Mentor</div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        {isLoggedIn && <li><Link to="/dashboard">Dashboard</Link></li>}
                        <li><Link to="/companiescatalog">Market</Link></li>
                        {isLoggedIn && <li><Link to="/budget">Budget</Link></li>}
                        {isLoggedIn && <li><Link to="/portfolio">Your Portfolio</Link></li>}
                        <li><Link to="/learn">Learn</Link></li>
                    </ul>
                </nav>
                <div className="nav-buttons">
                    {isLoggedIn ? (
                        <div className="user-profile-container">
                            <div className="user-profile-trigger" onClick={() => setShowDropdown(!showDropdown)}>
                                <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
                                <span className="username-display">{username}</span>
                                <span className={`arrow ${showDropdown ? 'up' : 'down'}`}>▼</span>
                            </div>
                            
                            {showDropdown && (
                                <div className="profile-dropdown card glass">
                                    <div className="dropdown-item" onClick={() => { navigate("/settings"); setShowDropdown(false); }}>
                                        ⚙️ Account Settings
                                    </div>
                                    <div className="dropdown-item" onClick={() => { navigate("/add-bank"); setShowDropdown(false); }}>
                                        🏦 Add Bank Account
                                    </div>
                                    <div className="dropdown-item" onClick={toggleTheme}>
                                        🌓 Switch Theme
                                    </div>
                                    <hr />
                                    <div className="dropdown-item logout" onClick={handleLogout}>
                                        🚪 Logout
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button className="btn btn-secondary" onClick={() => navigate("/register")}>Register</button>
                            <button className="btn btn-primary" onClick={() => navigate("/login")}>Login</button>
                        </>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
            
            <style jsx>{`
                .user-profile-container { position: relative; cursor: pointer; }
                .user-profile-trigger { 
                    display: flex; align-items: center; gap: 10px; 
                    padding: 5px 15px; border-radius: 30px; 
                    background: rgba(99, 102, 241, 0.1); border: 1px solid var(--primary);
                }
                .user-avatar { 
                    width: 30px; height: 30px; background: var(--primary); 
                    color: white; border-radius: 50%; display: flex; 
                    align-items: center; justify-content: center; font-weight: bold;
                }
                .profile-dropdown {
                    position: absolute; top: 45px; right: 0; width: 220px;
                    z-index: 1000; padding: 10px; border-radius: 12px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                }
                .dropdown-item { 
                    padding: 12px; border-radius: 8px; transition: all 0.2s; 
                    font-size: 0.9rem; font-weight: 500;
                }
                .dropdown-item:hover { background: rgba(99, 102, 241, 0.1); color: var(--primary); }
                .dropdown-item.logout { color: var(--error); }
                .dropdown-item.logout:hover { background: rgba(239, 68, 68, 0.1); }
                .arrow { font-size: 0.7rem; transition: transform 0.3s; }
                .arrow.up { transform: rotate(180deg); }
            `}</style>
        </header>
    );
};

export default Navbar;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/Home.css";

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = () => {
        return !!localStorage.getItem("token");
    };

    const handleExploreStocks = () => {
        if (isLoggedIn()) {
            navigate("/companiescatalog");
        } else {
            toast.info('Please login to start your investing journey', { position: "top-center" });
            setTimeout(() => navigate("/login"), 1500);
        }
    }

    return (
        <div className="home-page-v2">
            <Navbar/>
            <ToastContainer />
            
            {/* Main Hero Section */}
            <section className="hero-v2">
                <div className="hero-overlay"></div>
                <div className="container hero-container">
                    <div className="hero-text">
                        <span className="badge-promo">🚀 New: Gamified Learning Hub</span>
                        <h1 className="hero-title">Master the Market with <span className="highlight">Stock Mentor</span></h1>
                        <p className="hero-subtitle">
                            The only platform that turns stock market learning into a game. 
                            Earn coins, unlock badges, and build your virtual wealth while you learn.
                        </p>
                        <div className="hero-actions">
                            <button className="btn btn-primary btn-lg" onClick={handleExploreStocks}>
                                {isLoggedIn() ? "Go to Dashboard" : "Start Trading Now"}
                            </button>
                            <button className="btn btn-outline btn-lg" onClick={() => navigate("/learn")}>Watch Lessons</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        {/* A visual representation of a dashboard or stock growth */}
                        <div className="mock-card">
                            <div className="card-header">🚀 Portfolio Growth</div>
                            <div className="card-value">+₹12,450.00</div>
                            <div className="card-graph">📈</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose Stock Mentor?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎓</div>
                            <h3>Learn Like a Pro</h3>
                            <p>Access curated video lessons directly in the app. No more external redirects.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🪙</div>
                            <h3>Earn While You Learn</h3>
                            <p>Complete missions, buy stocks, and earn virtual coins to get real discounts.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Risk-Free Practice</h3>
                            <p>Trade with virtual money and real-time market data without any financial risk.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Only show if NOT logged in */}
            {!isLoggedIn() && (
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-box card glass">
                            <h2>Ready to become a Stock Mentor?</h2>
                            <p>Join thousands of users who are mastering the market today.</p>
                            <button className="btn btn-primary btn-lg" onClick={() => navigate("/register")}>Create Free Account</button>
                        </div>
                    </div>
                </section>
            )}

            <footer className="home-footer">
                <p>&copy; 2026 Stock Mentor. Built with ❤️ for smart investors.</p>
            </footer>
        </div>
    );
};

export default Home;
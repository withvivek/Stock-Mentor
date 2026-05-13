import React, { useState, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid,
    PieChart, Pie, Cell
} from "recharts";
import Navbar from "./Navbar";
import BadgeGallery from "./BadgeGallery";
import axios from "axios";
import "../style/Theme.css";
import "../style/Dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : { coins: 0, earnedBadges: [], currentStreak: 0 };
    });
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    // ...

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userString = localStorage.getItem('user');
                if (userString) {
                    const currentUser = JSON.parse(userString);
                    
                    // 1. Fetch Fresh User Data (Coins, etc.)
                    const userResponse = await axios.get(`http://localhost:8080/api/users`);
                    const freshUser = userResponse.data.find(u => u.id === currentUser.id);
                    if (freshUser) {
                        setUser(freshUser);
                        localStorage.setItem('user', JSON.stringify(freshUser));
                    }

                    // 2. Fetch Real Portfolio Data
                    const stocksResponse = await axios.get(`http://localhost:8080/api/stocks/user/${currentUser.id}`);
                    setPortfolio(stocksResponse.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculations based on real data
    const totalInvestment = portfolio.reduce((sum, stock) => sum + stock.quantity * stock.purchasePrice, 0);
    const totalValue = portfolio.reduce((sum, stock) => sum + stock.quantity * stock.currentPrice, 0);
    const gainLoss = totalValue - totalInvestment;
    const gainLossPercentage = totalInvestment > 0 ? (gainLoss / totalInvestment) * 100 : 0;
    
    // Mock charts for visual appeal (using real symbols)
    const performanceData = portfolio.map(stock => ({
        name: stock.stockSymbol,
        gainLoss: (stock.currentPrice - stock.purchasePrice) * stock.quantity
    }));

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];

    if (loading) return <div className="loading">Loading your financial world...</div>;

    return (
        <div className="dashboard-page">
            <Navbar />
            <div className="container">
                <div className="dashboard-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <h1 className="page-title">Investment Dashboard</h1>
                        {user.currentStreak > 0 && (
                            <span className="streak-badge" style={{ 
                                background: 'rgba(239, 68, 68, 0.1)', 
                                color: '#ef4444', 
                                padding: '5px 12px', 
                                borderRadius: '20px', 
                                fontWeight: 'bold',
                                border: '1px solid #ef4444',
                                fontSize: '0.9rem'
                            }}>
                                🔥 {user.currentStreak} Day Streak
                            </span>
                        )}
                    </div>
                    <div className="last-updated">
                        <span className="update-indicator"></span>
                        Last updated: {new Date().toLocaleTimeString()}
                    </div>
                </div>

                {/* Aesthetic Coin & Badge Section */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '25px', marginBottom: '30px' }}>
                    <div className="card wallet-card-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', borderRadius: '24px' }}>
                         <div className="floating-coin">🪙</div>
                         <h2 style={{ fontSize: '3.5rem', margin: '5px 0', fontWeight: '800' }}>{user.coins}</h2>
                         <p style={{ fontSize: '1.1rem', opacity: 0.9, fontWeight: '600' }}>Coins in Wallet</p>
                         <div style={{ marginTop: '20px', padding: '8px 20px', background: 'rgba(255,255,255,0.2)', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                            Value: ₹{(user.coins / 100).toFixed(2)}
                         </div>
                    </div>
                    <BadgeGallery earnedBadges={user.earnedBadges} />
                </div>

                {/* Mission Center */}
                <div className="card glass" style={{ marginBottom: '30px' }}>
                    <div className="card-header">
                        <h2>🎯 Quests & Missions</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
                        <div className="mission-item" style={{ padding: '15px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>🔑 Daily Login</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>+100 Coins</div>
                        </div>
                        <div className="mission-item" style={{ padding: '15px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '12px', border: '1px dashed var(--success)' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>📈 Buy a Stock</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--success)' }}>+1000 Coins</div>
                        </div>
                        <div className="mission-item" style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px dashed var(--error)' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>📉 Sell a Stock</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--error)' }}>+500 Coins</div>
                        </div>
                        <div className="mission-item" style={{ padding: '15px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '12px', border: '1px dashed var(--secondary)' }}>
                            <div style={{ fontSize: '1.2rem', marginBottom: '5px' }}>✨ Welcome Bonus</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>+500 Coins</div>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', padding: '10px', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.9rem', textAlign: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>
                        💡 Redeem Rule: 100 Coins = ₹1 Discount on your next stock purchase!
                    </div>
                </div>

                <div className="dashboard-metrics">
                    <div className="card metric-card">
                        <h3>Total Portfolio Value</h3>
                        <p className="metric-value">₹{totalValue.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                    </div>
                    <div className="card metric-card">
                        <h3>Total Investment</h3>
                        <p className="metric-value">₹{totalInvestment.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
                    </div>
                    <div className="card metric-card">
                        <h3>Net Gain/Loss</h3>
                        <p className="metric-value" style={{ color: gainLoss >= 0 ? 'var(--success)' : 'var(--error)' }}>
                            {gainLoss >= 0 ? '+' : ''}₹{gainLoss.toLocaleString('en-IN', {minimumFractionDigits: 2})}
                        </p>
                        <div className="metric-trend" style={{ color: gainLossPercentage >= 0 ? 'var(--success)' : 'var(--error)' }}>
                            {gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="card portfolio-card">
                        <div className="card-header">
                            <h2>Your Portfolio Holdings</h2>
                        </div>
                        {portfolio.length === 0 ? (
                            <div style={{ padding: '40px', textAlign: 'center' }}>
                                <p>You don't own any stocks yet.</p>
                                <button className="btn btn-primary" onClick={() => window.location.href='/companiescatalog'}>Go to Market</button>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Symbol</th>
                                            <th>Qty</th>
                                            <th>Date</th>
                                            <th>Avg Price</th>
                                            <th>Current</th>
                                            <th>Value</th>
                                            <th>Gain/Loss</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {portfolio.map((stock, index) => {
                                            const profit = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
                                            const profitPercent = ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
                                            
                                            return (
                                                <tr key={index}>
                                                    <td><span className="stock-symbol">{stock.stockSymbol}</span></td>
                                                    <td>{stock.quantity}</td>
                                                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                        {stock.purchaseDate ? new Date(stock.purchaseDate).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                                    </td>
                                                    <td>₹{stock.purchasePrice.toFixed(2)}</td>
                                                    <td>₹{stock.currentPrice.toFixed(2)}</td>
                                                    <td>₹{(stock.quantity * stock.currentPrice).toLocaleString()}</td>
                                                    <td style={{ color: profit >= 0 ? 'var(--success)' : 'var(--error)' }}>
                                                        {profit >= 0 ? '+' : ''}{profit.toFixed(2)} ({profitPercent.toFixed(2)}%)
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="card chart-card">
                        <div className="card-header">
                            <h2>Holding Breakdown</h2>
                        </div>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie 
                                        data={portfolio.map(s => ({ name: s.stockSymbol, value: s.quantity * s.currentPrice }))} 
                                        dataKey="value" 
                                        nameKey="name" 
                                        cx="50%" 
                                        cy="50%" 
                                        outerRadius={80} 
                                        label
                                    >
                                        {portfolio.map((entry, index) => (
                                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
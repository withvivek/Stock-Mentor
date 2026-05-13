import React from "react";
import "../style/Gamification.css";

const BadgeGallery = ({ earnedBadges }) => {
    const allBadges = [
        { id: "first_trade", name: "First Trade", icon: "🚀", desc: "Buy your first stock" },
        { id: "profit_maker", name: "Profit Maker", icon: "💰", desc: "Sell a stock for profit" },
        { id: "3-day_streak", name: "3-Day Streak", icon: "🔥", desc: "Login 3 days in a row" },
        { id: "balanced_pro", name: "Balanced Pro", icon: "⚖️", desc: "Own 5+ different stocks" },
        { id: "analyst", name: "Analyst", icon: "🧐", desc: "Read 5+ education articles" },
        { id: "big_bull", name: "Big Bull", icon: "🐂", desc: "Portfolio Value > ₹1L" },
    ];

    return (
        <div className="card glass badge-gallery-container">
            <div className="card-header">
                <h2>🏆 Achievement Badges</h2>
            </div>
            <div className="badge-grid">
                {allBadges.map((badge) => {
                    const isEarned = earnedBadges.includes(badge.id);
                    return (
                        <div key={badge.id} className={`badge-item ${isEarned ? "earned" : "locked"}`}>
                            <div className="badge-icon" style={{ fontSize: '2rem' }}>
                                {isEarned ? badge.icon : "🔒"}
                            </div>
                            <div className="badge-info">
                                <span className="badge-name">{badge.name}</span>
                                <p className="badge-desc" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    {badge.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BadgeGallery;

import React from 'react';
import '../style/Gamification.css';

const ExperienceBar = ({ xp = 0, level = 1 }) => {
    // Formula: XP for next level = 100 * (level + 1)^1.5
    const nextLevelXp = Math.floor(100 * Math.pow(level + 1, 1.5));
    const currentLevelXp = Math.floor(100 * Math.pow(level, 1.5));
    
    // XP progress within the current level
    const progressInLevel = xp - currentLevelXp;
    const totalNeededInLevel = nextLevelXp - currentLevelXp;
    
    const percentage = Math.min(Math.max((progressInLevel / totalNeededInLevel) * 100, 0), 100);

    // Rank titles based on level
    const getRankTitle = (lvl) => {
        if (lvl < 5) return "Beginner";
        if (lvl < 10) return "Analyst";
        if (lvl < 20) return "Trader";
        if (lvl < 40) return "Expert";
        return "Guru";
    };

    return (
        <div className="xp-container card glass">
            <div className="xp-header">
                <div>
                    <span className="level-badge">Level {level}</span>
                    <span style={{ marginLeft: '10px', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {getRankTitle(level)}
                    </span>
                </div>
                <div className="xp-text">
                    {xp} / {nextLevelXp} XP
                </div>
            </div>
            
            <div className="xp-bar-bg">
                <div 
                    className="xp-bar-fill" 
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            
            <p style={{ fontSize: '0.75rem', marginTop: '8px', color: 'var(--text-secondary)' }}>
                {Math.floor(nextLevelXp - xp)} XP needed for next level
            </p>
        </div>
    );
};

export default ExperienceBar;

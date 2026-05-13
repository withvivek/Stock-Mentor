# 🚀 Stock Mentor - Smart Investment & Learning Platform

**Stock Mentor** is a comprehensive, full-stack web application designed to help users track stock market data, manage their investment budgets, and learn about the market through a gamified experience.

![Dashboard Preview](https://img.shields.io/badge/UI-Modern%20Glassmorphism-blueviolet)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen)
![Frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-green)

---

## ✨ Key Features

### 📈 1. Real-Time Market Catalog
- **Live Data**: Fetch real-time stock prices for NSE and BSE using the Alpha Vantage API.
- **Smart Fallback**: Even if the API hits its free-tier limit, the system automatically switches to a **local cache** to ensure the app never crashes and always shows data.
- **Search & Filter**: Search for any stock symbol (e.g., TCS, RELIANCE) and get instant updates.

### 🤖 2. AI Investment Assistant
- **Powered by Groq AI**: A high-speed AI chatbot integrated into the platform.
- **Smart Advice**: Ask questions about investment strategies, market terms, or stock analysis.
- **Context Aware**: The AI knows it is part of the Stock Mentor platform and provides relevant guidance.

### 🏆 3. Gamified Learning System
- **Level Up**: Earn **Experience Points (XP)** by completing learning modules and tracking budgets.
- **Badges**: Unlock unique badges (e.g., "Budget King", "Early Investor") as you progress.
- **Progress Tracking**: Visual experience bars and a dedicated Badge Gallery to track your growth.

### 💰 4. Portfolio & Budget Management
- **User Isolation**: Every user has their own private budget and expense tracking.
- **Visual Analytics**: Track your spending vs. budget with dynamic progress bars.
- **Currency Support**: Fully localized for the Indian market with (₹) symbol support.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vanilla CSS (Premium Glassmorphism UI), Chart.js.
- **Backend**: Java Spring Boot, Maven, Spring Security.
- **Database**: MongoDB Atlas (Cloud Database).
- **APIs**: 
  - **Alpha Vantage** (Stock Market Data)
  - **Groq AI** (Artificial Intelligence)

---

## 🚀 Getting Started

### Prerequisites
- **Java 17** or higher
- **Node.js** & npm
- **MongoDB** (Atlas or Local)

### 1. Backend Setup (Spring Boot)
1. Navigate to the `MongoSpring` directory.
2. Open `src/main/resources/application.properties`.
3. Add your **Groq API Key** and **Alpha Vantage API Key**.
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### 2. Frontend Setup (React)
1. Navigate to the `stock_front` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## 🛡️ Security
- **JWT Authentication**: Secure login and session management.
- **Push Protection**: Sensitive API keys are protected from being exposed in version history via environment variable support.

---

## 🤝 The Team
Developed with ❤️ by **Vivek Yadav** and the Stock Mentor Team.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
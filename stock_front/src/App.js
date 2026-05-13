import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Portfolio from "./components/Portfolio";
import RegistrationPage from "./components/RegistrationPage";
import DematAccount from "./components/DematAccount";
import CreateDematAccount from "./components/CreateDematAccount";
import CompaniesCatalog from "./components/CompaniesCatalog";
import Learn from "./components/Learn";
import Budget from "./components/Budget";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import AddBank from "./components/AddBank";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/demataccount" element={<DematAccount />} />
        <Route path="/createdemat" element={<CreateDematAccount />} />
        <Route path="/companiescatalog" element={<CompaniesCatalog />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-bank" element={<AddBank />} />
      </Routes>
      <Chatbot />
    </Router>
  );
};

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../style/Theme.css";
import "../style/DematAccount.css";

const DematAccount = () => {
  const navigate = useNavigate();
  const [hasAccount, setHasAccount] = useState(null);

  return (
    <div className="demat-account-page">
      <Navbar />
      <div className="container">
        <div className="demat-account-card">
          <h2 className="account-title">Do you have a Demat account?</h2>

          <div className="button-group">
            <button 
              className="btn btn-success"
              onClick={() => setHasAccount(true)}
            >
              Yes
            </button>
            <button 
              className="btn btn-error"
              onClick={() => setHasAccount(false)}
            >
              No
            </button>
          </div>

          {hasAccount !== null && (
            <button
              className={`btn ${hasAccount ? "btn-primary" : "btn-secondary"}`}
              onClick={() => navigate(hasAccount ? "/portfolio" : "/createdemat")}
            >
              {hasAccount ? "Buy Stocks" : "Create Demat Account"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DematAccount;

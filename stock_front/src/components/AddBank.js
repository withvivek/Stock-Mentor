import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "../style/Theme.css";

const AddBank = () => {
    const navigate = useNavigate();
    const [bankData, setBankData] = useState({
        accountNumber: "",
        ifsc: "",
        bankName: "HDFC Bank",
        accountHolder: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Simulate bank verification delay
        setTimeout(() => {
            toast.success("Bank Account Linked Successfully! 🏦");
            setIsSaving(false);
            navigate("/dashboard");
        }, 2000);
    };

    return (
        <div className="add-bank-page">
            <Navbar />
            <div className="container" style={{ marginTop: '50px', maxWidth: '500px' }}>
                <h1 className="page-title">Link Bank Account</h1>
                <p className="subtitle">Connect your bank to enable instant deposits and withdrawals.</p>

                <div className="card glass" style={{ padding: '30px', marginTop: '30px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Select Bank</label>
                            <select 
                                className="form-control" 
                                value={bankData.bankName}
                                onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            >
                                <option>HDFC Bank</option>
                                <option>SBI</option>
                                <option>ICICI Bank</option>
                                <option>Axis Bank</option>
                                <option>Kotak Mahindra</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Account Holder Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="As per bank records"
                                required
                                value={bankData.accountHolder}
                                onChange={(e) => setBankData({...bankData, accountHolder: e.target.value})}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Account Number</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Enter account number"
                                required
                                value={bankData.accountNumber}
                                onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '30px' }}>
                            <label>IFSC Code</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="e.g. HDFC0001234"
                                required
                                value={bankData.ifsc}
                                onChange={(e) => setBankData({...bankData, ifsc: e.target.value.toUpperCase()})}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className={`btn btn-primary ${isSaving ? 'loading' : ''}`}
                            style={{ width: '100%', padding: '15px' }}
                            disabled={isSaving}
                        >
                            {isSaving ? "Verifying with Bank..." : "Link Bank Account"}
                        </button>
                    </form>
                </div>
                
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    🔒 Your data is encrypted and secure with Stock Mentor.
                </div>
            </div>
        </div>
    );
};

export default AddBank;

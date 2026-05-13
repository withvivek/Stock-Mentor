import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Theme.css";
import Navbar from "./Navbar";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    allocatedAmount: "",
    expenseCategory: "",
    description: "",
    amount: ""
  });

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
        const currentUser = JSON.parse(userString);
        setUser(currentUser);
        fetchBudgets(currentUser.id);
    }
  }, []);

  const fetchBudgets = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/budget/user/${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const addBudget = async () => {
    if (!formData.category || !formData.allocatedAmount) {
      toast.warn("Please enter category and amount!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/budget/add", {
        userId: user.id,
        category: formData.category,
        allocatedAmount: parseFloat(formData.allocatedAmount),
      });
      toast.success("Budget added successfully! 💰");
      setFormData({...formData, category: "", allocatedAmount: ""});
      fetchBudgets(user.id);
    } catch (error) {
      toast.error("Error adding budget!");
    }
  };

  const addExpense = async () => {
    if (!formData.expenseCategory || !formData.description || !formData.amount) {
      toast.warn("Please fill all fields!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/budget/user/${user.id}/addExpense/${formData.expenseCategory}`,
        {
          description: formData.description,
          amount: parseFloat(formData.amount),
          dateTime: new Date().toISOString()
        }
      );
      toast.success("Expense tracked! 📉");
      setFormData({...formData, description: "", amount: "", expenseCategory: ""});
      fetchBudgets(user.id);
    } catch (error) {
      toast.error(error.response?.data || "Error adding expense!");
    }
  };

  return (
    <div className="budget-page">
      <Navbar />
      <ToastContainer position="top-right" />
      <div className="container">
        <div className="budget-header-section">
            <h1 className="page-title">Budget Management</h1>
            <p className="subtitle" style={{ textAlign: 'center', marginBottom: '30px' }}>
                Track your savings and expenses to find your investable surplus.
            </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
          <div className="card glass">
            <h2>➕ Add New Budget</h2>
            <div style={{ marginTop: '20px' }}>
                <label>Category Name</label>
                <input
                type="text"
                name="category"
                className="form-control"
                placeholder="e.g. Rent, Food, Investment"
                value={formData.category}
                onChange={handleChange}
                />
                <label>Monthly Limit (₹)</label>
                <input
                type="number"
                name="allocatedAmount"
                className="form-control"
                placeholder="Amount in ₹"
                value={formData.allocatedAmount}
                onChange={handleChange}
                />
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={addBudget}>Save Budget</button>
            </div>
          </div>

          <div className="card glass">
            <h2>💸 Track Expense</h2>
            <div style={{ marginTop: '20px' }}>
                <label>Category</label>
                <select 
                name="expenseCategory"
                className="form-control"
                value={formData.expenseCategory} 
                onChange={handleChange}
                >
                <option value="">Select Budget Category</option>
                {budgets.map((budget) => (
                    <option key={budget.id} value={budget.category}>
                    {budget.category}
                    </option>
                ))}
                </select>
                <label>Description</label>
                <input
                type="text"
                name="description"
                className="form-control"
                placeholder="What did you spend on?"
                value={formData.description}
                onChange={handleChange}
                />
                <label>Amount (₹)</label>
                <input
                type="number"
                name="amount"
                className="form-control"
                placeholder="Amount in ₹"
                value={formData.amount}
                onChange={handleChange}
                />
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={addExpense}>Log Expense</button>
            </div>
          </div>
        </div>

        <div className="budget-list">
          <h2 style={{ marginBottom: '20px' }}>📊 Your Monthly Budgets</h2>
          {budgets.length === 0 ? (
            <div className="card glass" style={{ textAlign: 'center', padding: '50px' }}>
                <p>No budgets tracked yet. Start by adding your first category!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100%, 1fr))', gap: '20px' }}>
                {budgets.map((budget) => {
                    const spent = budget.allocatedAmount - budget.remainingAmount;
                    const percent = (spent / budget.allocatedAmount) * 100;
                    
                    return (
                    <div key={budget.id} className="card glass budget-item" style={{ borderLeft: `5px solid ${percent > 90 ? 'var(--error)' : 'var(--success)'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{budget.category}</h3>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Status: {percent >= 100 ? 'Limit Reached' : 'Within Budget'}</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{spent.toFixed(2)} / ₹{budget.allocatedAmount.toFixed(2)}</div>
                            <div style={{ color: budget.remainingAmount < 500 ? 'var(--error)' : 'var(--success)', fontWeight: 'bold' }}>
                                Left: ₹{budget.remainingAmount.toFixed(2)}
                            </div>
                        </div>
                        </div>

                        <div style={{ width: '100%', height: '10px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
                        <div
                            style={{
                            width: `${Math.min(percent, 100)}%`,
                            height: '100%',
                            background: percent > 90 ? 'var(--error)' : 'var(--success)',
                            transition: 'width 0.5s ease-in-out'
                            }}
                        ></div>
                        </div>

                        <div className="expense-history">
                        <h4 style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>📜 Recent History</h4>
                        {budget.expenses.length === 0 ? (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No expenses recorded for this category.</p>
                        ) : (
                            <div className="table-container">
                                <table className="table">
                                <thead>
                                    <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budget.expenses.slice(-5).reverse().map((expense, index) => (
                                    <tr key={index}>
                                        <td>{expense.description}</td>
                                        <td style={{ fontWeight: 'bold', color: 'var(--error)' }}>-₹{expense.amount.toFixed(2)}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{new Date(expense.dateTime).toLocaleDateString()}</td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        )}
                        </div>
                    </div>
                    )
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budget;
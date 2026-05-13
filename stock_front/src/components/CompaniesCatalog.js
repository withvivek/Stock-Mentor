import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addStock } from "../api/stockApi";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import "../style/Theme.css";
import "../style/CompaniesCatalog.css";

const CompaniesCatalog = () => {
  const [exchange, setExchange] = useState("NSE");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Checkout Modal State
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [useCoins, setUseCoins] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
        setUser(JSON.parse(userString));
    }

    const fetchMarketData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/stocks/market-data/${exchange}`);
        setStocks(response.data);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setStocks(getSampleBseData());
        toast.info("Showing fallback market data");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [exchange]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setIsSearching(true);
      const response = await axios.get(`http://localhost:8080/api/stocks/live/${searchTerm.toUpperCase()}`);
      if (response.data && response.data.name) {
        // Add the searched stock to the top of the list if not already there
        setStocks(prev => {
          const filtered = prev.filter(s => s.name !== response.data.name);
          return [response.data, ...filtered];
        });
        toast.success(`Found live data for ${searchTerm.toUpperCase()}!`);
      } else {
        toast.error("Symbol not found or API limit reached");
      }
    } catch (error) {
      toast.error("Error searching for stock");
    } finally {
      setIsSearching(false);
      setSearchTerm("");
    }
  };

  const getSampleBseData = () => {
    return [
      { name: "RELIANCE", price: "2540.00", change: "12.5", changePercent: "0.5%", type: "GAINER" },
      { name: "TCS", price: "3420.00", change: "-15.2", changePercent: "-0.4%", type: "LOSER" },
      { name: "INFY", price: "1580.00", change: "25.0", changePercent: "1.6%", type: "GAINER" },
      { name: "SBIN", price: "580.00", change: "10.0", changePercent: "1.7%", type: "GAINER" },
      { name: "HDFCBANK", price: "1650.00", change: "5.0", changePercent: "0.3%", type: "GAINER" }
    ];
  };

  const openCheckout = (stock) => {
    if (!user) {
      toast.error("Please login to buy stocks");
      return;
    }
    setSelectedStock(stock);
    setIsModalOpen(true);
    setUseCoins(false);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Calculate coins to use (Integer)
    const discountInRupees = useCoins ? Math.min(Math.floor(user.coins / 100), parseFloat(selectedStock.price)) : 0;
    const coinsToDeduct = Math.round(discountInRupees * 100);

    try {
      // 1. Simulate Payment Delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Deduct Coins if used
      if (useCoins && coinsToDeduct > 0) {
        await axios.post(`http://localhost:8080/api/users/${user.id}/deduct-coins?amount=${coinsToDeduct}`);
      }

      // 3. Add Stock
      await addStock({
        userId: user.id,
        stockSymbol: selectedStock.name,
        stockName: selectedStock.name,
        quantity: 1,
        purchasePrice: parseFloat(selectedStock.price) - discountInRupees,
        currentPrice: parseFloat(selectedStock.price)
      });

      toast.success(`${selectedStock.name} Purchased Successfully! 🚀`, { position: "top-center" });
      setIsModalOpen(false);
      navigate("/portfolio");
    } catch (error) {
      toast.error("Payment Failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="companies-catalog">
      <Navbar />
      <div className="container">
        <div className="catalog-header">
          <div>
            <h1 className="page-title">Stock Market</h1>
            <p className="subtitle">Invest in your favorite companies</p>
          </div>
          
          <div className="header-actions">
            <form className="search-bar" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Ex: TCS.BSE, SBIN.BSE, AAPL..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" disabled={isSearching}>
                {isSearching ? "..." : "🔍"}
              </button>
            </form>

            <div className="exchange-toggle">
              <button className={`btn ${exchange === "NSE" ? "btn-primary" : "btn-secondary"}`} onClick={() => setExchange("NSE")}>NSE</button>
              <button className={`btn ${exchange === "BSE" ? "btn-primary" : "btn-secondary"}`} onClick={() => setExchange("BSE")}>BSE</button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Fetching Real-time Market Data...</p>
          </div>
        ) : (
          <div className="stocks-grid">
            {stocks.map((stock, index) => (
              <div key={index} className="card stock-card animate-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stock-header">
                  <div className="stock-info">
                    <h3>{stock.name}</h3>
                    <p className="ticker-label">Global Equity</p>
                  </div>
                  <span className={`tag ${stock.type === "GAINER" ? "gainer" : stock.type === "LOSER" ? "loser" : "index"}`}>
                    {stock.type}
                  </span>
                </div>
                
                <div className="stock-body">
                  <div className="price-box">
                    <span className="currency">₹</span>
                    <span className="amount">{parseFloat(stock.price).toLocaleString()}</span>
                  </div>
                  <div className={`change-indicator ${parseFloat(stock.changePercent) >= 0 ? "up" : "down"}`}>
                    {parseFloat(stock.changePercent) >= 0 ? "▲" : "▼"} {stock.changePercent}
                  </div>
                </div>

                <div className="stock-footer">
                  <button className="btn btn-primary buy-btn" onClick={() => openCheckout(stock)}>Buy Shares</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Checkout Modal */}
      {isModalOpen && selectedStock && (
        <div className="modal-overlay">
          <div className="modal-content glass checkout-modal">
            <div className="modal-header">
              <h2>Secure Checkout</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            
            <div className="checkout-body">
              <div className="order-summary">
                <div className="summary-item">
                  <span>Stock</span>
                  <span className="bold">{selectedStock.name}</span>
                </div>
                <div className="summary-item">
                  <span>Quantity</span>
                  <span className="bold">1</span>
                </div>
                <div className="summary-item">
                  <span>Price</span>
                  <span className="bold">₹{parseFloat(selectedStock.price).toFixed(2)}</span>
                </div>
                <hr />
                
                {user.coins > 0 && (
                   <div className="coin-redemption">
                      <label className="checkbox-container">
                        <input 
                            type="checkbox" 
                            checked={useCoins} 
                            onChange={(e) => setUseCoins(e.target.checked)} 
                        />
                        <span className="checkmark"></span>
                        Use Wallet Coins? (Balance: {user.coins})
                      </label>
                      {useCoins && (
                        <div className="discount-applied">
                           Discount Applied: -₹{(Math.min(Math.floor(user.coins / 100), parseFloat(selectedStock.price))).toFixed(2)}
                        </div>
                      )}
                   </div>
                )}

                <div className="total-row">
                  <span>Total Payable</span>
                  <span className="total-amount">
                    ₹{(parseFloat(selectedStock.price) - (useCoins ? Math.min(Math.floor(user.coins / 100), parseFloat(selectedStock.price)) : 0)).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="payment-gateway">
                <div className="card-simulation">
                  <div className="card-chip"></div>
                  <div className="card-number">**** **** **** 8302</div>
                  <div className="card-name">{user.firstName} {user.lastName}</div>
                </div>
                
                <button 
                    className={`btn btn-primary pay-btn ${isProcessing ? 'loading' : ''}`} 
                    onClick={handlePayment}
                    disabled={isProcessing}
                >
                  {isProcessing ? "Processing Payment..." : `Pay Securely ₹${(parseFloat(selectedStock.price) - (useCoins ? Math.min(Math.floor(user.coins / 100), parseFloat(selectedStock.price)) : 0)).toFixed(2)}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }
        .checkout-modal {
          width: 500px;
          padding: 30px;
          border-radius: 24px;
        }
        .summary-item { display: flex; justify-content: space-between; margin: 10px 0; }
        .bold { font-weight: 700; }
        .total-row { display: flex; justify-content: space-between; margin-top: 20px; font-size: 1.5rem; font-weight: 800; color: var(--primary); }
        .coin-redemption { background: rgba(245, 158, 11, 0.1); padding: 15px; border-radius: 12px; margin: 20px 0; border: 1px dashed #f59e0b; }
        .discount-applied { color: #10b981; font-weight: bold; margin-top: 10px; font-size: 0.9rem; }
        .card-simulation { 
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          color: white; padding: 20px; border-radius: 15px; margin: 30px 0;
          position: relative; height: 160px; display: flex; flex-direction: column; justify-content: space-between;
        }
        .card-chip { width: 40px; height: 30px; background: #fbbf24; border-radius: 5px; }
        .pay-btn { width: 100%; padding: 15px; font-size: 1.1rem; }
        .pay-btn.loading { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </div>
  );
};

export default CompaniesCatalog;
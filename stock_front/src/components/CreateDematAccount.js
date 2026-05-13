import React from 'react';
import Navbar from './Navbar';
import "../style/Theme.css";
import "../style/CreateDemat.css";

const brokers = [
  {
    name: "Zerodha",
    logo: "https://th.bing.com/th?id=OIP.K-iejz2_ZcuJI-jyqIr3UQAAAA&w=352&h=63&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    video: "https://www.youtube.com/embed/Y__a4UxNU10?si=7RZTTgVLNHh9agFn",
    signupLink: "https://zerodha.com/open-account",
    loginLink: "https://kite.zerodha.com/",
    description: "India's largest stockbroker with zero brokerage on equity delivery."
  },
  {
    "name": "Groww",
    "logo": "https://th.bing.com/th/id/OIP.4UfpbfTnUNdXlYzLVDmS1gHaCB?w=338&h=95&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "video": "https://www.youtube.com/embed/II8pBNWUU6g?si=tyfxCVYONfAgLiEZ",
    "signupLink": "https://groww.in/",
    "loginLink": "https://groww.in/login",
    "description": "Beginner-friendly platform with commission-free investments."
  },
  {
    "name": "Upstox",
    "logo": "https://th.bing.com/th/id/OIP.kVd42p1OWCPQEwXmD6L5IAHaCT?w=308&h=108&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "video": "https://www.youtube.com/embed/ntirjVFhkfI?si=aoBGM5DUqQQ0CPmS",
    "signupLink": "https://upstox.com/",
    "loginLink": "https://pro.upstox.com/",
    "description": "Low-cost trading with advanced charting tools."
  },
  {
    "name": "Angel One",
    "logo": "https://cio.eletsonline.com/wp-content/uploads/2021/10/AngelOne.jpg",
    "video": "https://www.youtube.com/embed/ugJD577TZPI?si=jeZwom6faK-xC5r9",
    "signupLink": "https://www.angelone.in/",
    "loginLink": "https://trade.angelone.in/",
    "description": "Full-service broker with AI-powered research."
  },
  {
    "name": "ICICI Direct",
    "logo": "https://th.bing.com/th/id/OIP.JguvEAPGE9PydIfb0IyKzQHaCB?rs=1&pid=ImgDetMain",
    "video": "https://www.youtube.com/embed/RMU-ZG6pvG8?si=rp6u2som6j0CV4K1",
    "signupLink": "https://www.icicidirect.com/",
    "loginLink": "https://secure.icicidirect.com/",
    "description": "3-in-1 account with ICICI Bank for seamless trading."
  },
  {
    "name": "5Paisa",
    "logo": "https://www.patrikajagat.com/wp-content/uploads/2020/07/5-paisa.jpg",
    "video": "https://www.youtube.com/embed/T783ImGSttw?si=TrWKHQ-Z46Vg9gD_",
    "signupLink": "https://www.5paisa.com/",
    "loginLink": "https://trade.5paisa.com/",
    "description": "Low-cost brokerage with research and advisory services."
  },
  {
    "name": "Fyers",
    "logo": "https://th.bing.com/th/id/OIP.jUATr-iOeK2RAKKSIB4OzAHaEK?rs=1&pid=ImgDetMain",
    "video": "https://www.youtube.com/embed/TYm9dz5XFTI",
    "signupLink": "https://login.fyers.in/",
    "loginLink": "https://fyers.in/login",
    "description": "Advanced charting and commission-free delivery trading."
  },
  {
    "name": "HDFC Securities",
    "logo": "https://www.hdfcsec.com/favicon.ico",
    "video": "https://www.youtube.com/embed/wGo-HWuAVuI?si=6JZCfEgXllAel4K7",
    "signupLink": "https://www.hdfcsec.com/",
    "loginLink": "https://ntrade.hdfcsec.com/",
    "description": "Trusted platform with banking-backed security."
  },
  {
    "name": "Sharekhan",
    "logo": "https://th.bing.com/th/id/OIP.KNEGfHak-JkG-B7Iu0lVYgAAAA?w=286&h=84&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "video": "https://www.youtube.com/embed/q4_dlTPAFBk?si=XU695LcSWMwp0EoL",
    "signupLink": "https://www.sharekhan.com/",
    "loginLink": "https://newtrade.sharekhan.com/",
    "description": "Offers in-depth research and trading tools."
  },
  {
    "name": "Motilal Oswal",
    "logo": "https://th.bing.com/th/id/OIP.pgt1rTZ4NOhejawbVqzIKwHaEU?w=309&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "video": "https://www.youtube.com/embed/hQkfgZrr-Ko?si=vTrs39pJ2xjfN7WK",
    "signupLink": "https://www.motilaloswal.com/",
    "loginLink": "https://invest.motilaloswal.com/",
    "description": "Comprehensive financial services with expert research."
  }
];

const CreateDematAccount = () => {
  return (
    <div className="create-demat-page">
      <Navbar/>
      <div className="container">
        <h1 className="page-title">Create Your Demat Account</h1><br></br>

        <div className="broker-grid">
          {brokers.map((broker) => (
            <div key={broker.name} className="card broker-card">
              <img src={broker.logo} alt={broker.name} className="broker-logo" />
              <h3 className="broker-title">{broker.name}</h3>
              <p className="broker-description">{broker.description}</p>

              <div className="video-container">
                <iframe
                  className="broker-video"
                  src={broker.video}
                  title={broker.name}
                  allowFullScreen
                ></iframe>
              </div>

              <div className="button-group">
                <a href={broker.signupLink} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-primary">Open Account</button>
                </a>
                <a href={broker.loginLink} target="_blank" rel="noopener noreferrer">
                  <button className="btn btn-secondary">Login</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDematAccount;
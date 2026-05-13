import React, { useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Theme.css";

const Learn = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  
  const modules = [
    {
      title: "🟢 Module 1: Introduction to Markets",
      lessons: [
        {
          title: "The Birth of a Stock",
          videoId: "p7HKvqRI_Bo",
          content: `
            <h3>History & Purpose of Stock Markets</h3>
            <p>The concept of a stock market dates back to the 1600s with the Dutch East India Company. Today, it serves as the backbone of modern capitalism.</p>
            <h4>Why do Companies Issue Stocks?</h4>
            <ol>
                <li><strong>Capital Expansion:</strong> To build new factories, hire more staff, or expand globally.</li>
                <li><strong>Debt Reduction:</strong> To pay off loans without high interest.</li>
                <li><strong>Brand Visibility:</strong> Being a 'Listed' company adds prestige and trust.</li>
            </ol>
            <p>Investing in stocks means you are betting on the company's future growth. If they succeed, you succeed.</p>
          `
        },
        {
          title: "The Stock Exchange (NSE vs BSE)",
          videoId: "DInMru2_V6E",
          content: `
            <h3>Where does the Trading happen?</h3>
            <p>In India, we have two primary stock exchanges:</p>
            <h4>1. BSE (Bombay Stock Exchange)</h4>
            <p>Oldest in Asia, tracks <strong>SENSEX</strong>.</p>
            <h4>2. NSE (National Stock Exchange)</h4>
            <p>Largest by volume, tracks <strong>NIFTY 50</strong>.</p>
          `
        }
      ]
    },
    {
      title: "📊 Module 2: Fundamental Analysis",
      lessons: [
        {
          title: "Understanding Financial Ratios",
          videoId: "R06l_WjH4yE",
          content: `
            <h3>How to Judge a Company?</h3>
            <p>Fundamental analysis is about looking at the 'Health' of the business.</p>
            <h4>Key Ratios:</h4>
            <ul>
                <li><strong>P/E Ratio:</strong> Is it expensive or cheap?</li>
                <li><strong>Debt-to-Equity:</strong> Does the company owe too much money?</li>
                <li><strong>ROE:</strong> How much profit are they making for you?</li>
            </ul>
          `
        }
      ]
    },
    {
        title: "📈 Module 3: Technical Analysis Pro",
        lessons: [
          {
            title: "Advanced Chart Patterns",
            videoId: "qW9i7Xn86-w",
            content: `
              <h3>Reading the Market's Mood</h3>
              <p>Technical analysis believes that 'History repeats itself'.</p>
              <h4>Patterns to watch:</h4>
              <ul>
                <li><strong>Head and Shoulders:</strong> Trend reversal indicator.</li>
                <li><strong>Double Bottom:</strong> Buying signal.</li>
                <li><strong>Cup and Handle:</strong> Continuation signal.</li>
              </ul>
            `
          }
        ]
      },
      {
        title: "🛠️ Module 4: Practical Trading Guide",
        lessons: [
          {
            title: "How to Actually Buy/Sell?",
            videoId: "7wDkHl77h4Q",
            content: `
              <h3>Step-by-Step: Placing Your First Order</h3>
              <p>Buying a stock is more than just clicking a button. You need to understand the 'Order Types'.</p>
              <h4>1. Market Order</h4>
              <p>Buy the stock immediately at whatever price is available in the market. Use this for highly active stocks.</p>
              <h4>2. Limit Order</h4>
              <p>You specify the price (e.g. "Buy SBI only if it hits ₹600"). This gives you control but the order might not get filled if the price doesn't hit your limit.</p>
              <h4>3. Intraday vs Delivery</h4>
              <ul>
                <li><strong>Intraday (MIS):</strong> Buy and sell on the same day. High risk!</li>
                <li><strong>Delivery (CNC):</strong> Hold the stock for days, months, or years. Low risk.</li>
              </ul>
              <p><strong>Action:</strong> Go to the 'Market' section in Stock Mentor and try placing a Limit order today!</p>
            `
          },
          {
            title: "How to Book Profits?",
            videoId: "W6aG84tW_C4",
            content: `
              <h3>Don't Be Greedy: The Art of Selling</h3>
              <p>Profit is only 'Real' when it hits your bank account. Until then, it's just numbers on a screen.</p>
              <h4>The 2-1 Strategy:</h4>
              <p>If you are willing to lose ₹100, you should aim to earn ₹200. This is called a <strong>Risk-to-Reward Ratio</strong> of 1:2.</p>
              <h4>Trailling Stop-Loss:</h4>
              <p>If your stock goes from ₹100 to ₹120, move your stop-loss to ₹110. This way, even if the market falls, you exit with some profit.</p>
            `
          },
          {
            title: "Market Awareness & Scams",
            videoId: "X7_K_D_vW_0",
            content: `
              <h3>Protecting Your Capital</h3>
              <p>The first rule of trading is: <strong>SURVIVAL</strong>. If you lose all your money, you can't play the game.</p>
              <h4>Beware of 'Sure-Shot' Tips</h4>
              <p>Never trust Telegram or WhatsApp groups that promise 100% profit. These are often 'Pump and Dump' scams where they make you buy a junk stock so they can sell theirs at a high price.</p>
              <h4>Diversify!</h4>
              <p>Never put more than 10-15% of your money in a single stock. Spread your risk across different sectors like IT, Banking, and Energy.</p>
            `
          }
        ]
      },
      {
        title: "🧠 Module 5: Trading Psychology",
        lessons: [
          {
            title: "Managing Greed and Fear",
            videoId: "X7_K_D_vW_0",
            content: `
              <h3>The Battle in Your Mind</h3>
              <p>90% of trading is psychology. Even with the best strategy, you can lose if you don't control your emotions.</p>
            `
          }
        ]
      }
  ];

  const currentLesson = modules[activeModule].lessons[activeLesson];

  return (
    <div className="learn-page-v3">
      <Navbar />
      <ToastContainer position="top-right" />
      
      <div className="lms-container">
        {/* Sidebar Navigation */}
        <aside className="lms-sidebar card glass">
            <div className="sidebar-header">
                <h2>🎓 Stock Academy</h2>
                <div className="progress-mini">
                    Learning Progress: {Math.round(((activeModule * 2 + activeLesson) / (modules.length * 2)) * 100)}%
                </div>
            </div>
            <div className="module-list">
                {modules.map((module, mIdx) => (
                    <div key={mIdx} className="module-item">
                        <div className="module-title">{module.title}</div>
                        <ul className="lesson-list">
                            {module.lessons.map((lesson, lIdx) => (
                                <li 
                                    key={lIdx} 
                                    className={`lesson-item ${activeModule === mIdx && activeLesson === lIdx ? 'active' : ''}`}
                                    onClick={() => { setActiveModule(mIdx); setActiveLesson(lIdx); }}
                                >
                                    {activeModule === mIdx && activeLesson === lIdx ? '📖' : '📄'} {lesson.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>

        {/* Main Content Area */}
        <main className="lms-content">
            <div className="video-section card glass">
                <div className="video-container">
                    <iframe 
                        width="100%" 
                        height="450" 
                        src={`https://www.youtube.com/embed/${currentLesson.videoId}`} 
                        title={currentLesson.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="reading-section card glass" style={{ marginTop: '20px' }}>
                <div className="lesson-header">
                    <h1>{currentLesson.title}</h1>
                    <span className="module-tag">{modules[activeModule].title.split(':')[0]}</span>
                </div>
                <hr style={{ margin: '20px 0', opacity: 0.1 }} />
                
                <div className="article-body">
                    <div className="reading-time">⏱️ Estimated Reading Time: 7 mins</div>
                    <div dangerouslySetInnerHTML={{ __html: currentLesson.content }}></div>
                </div>
                
                <div className="lesson-footer" style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                    <button 
                        className="btn btn-secondary" 
                        disabled={activeLesson === 0 && activeModule === 0}
                        onClick={() => {
                            if (activeLesson > 0) setActiveLesson(activeLesson - 1);
                            else if (activeModule > 0) {
                                setActiveModule(activeModule - 1);
                                setActiveLesson(modules[activeModule-1].lessons.length - 1);
                            }
                        }}
                    >
                        ⬅️ Previous
                    </button>
                    <div className="lesson-counter">
                        Lesson {activeLesson + 1} of {modules[activeModule].lessons.length}
                    </div>
                    <button 
                        className="btn btn-primary"
                        disabled={activeModule === modules.length - 1 && activeLesson === modules[activeModule].lessons.length - 1}
                        onClick={() => {
                            if (activeLesson < modules[activeModule].lessons.length - 1) setActiveLesson(activeLesson + 1);
                            else if (activeModule < modules.length - 1) {
                                setActiveModule(activeModule + 1);
                                setActiveLesson(0);
                            }
                        }}
                    >
                        Next Lesson ➡️
                    </button>
                </div>
            </div>
        </main>
      </div>

      <style jsx>{`
        .lms-container {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 25px;
            padding: 30px;
            max-width: 1500px;
            margin: 0 auto;
        }
        .sidebar-header {
            padding: 25px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }
        .progress-mini {
            font-size: 0.75rem;
            margin-top: 5px;
            opacity: 0.8;
        }
        .lms-sidebar {
            height: calc(100vh - 140px);
            overflow-y: auto;
            padding: 0;
            position: sticky;
            top: 100px;
            border-radius: 12px;
        }
        .module-title {
            background: #f1f5f9;
            padding: 15px 20px;
            font-weight: 800;
            font-size: 0.8rem;
            color: var(--text-primary);
            border-bottom: 1px solid var(--border);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .lesson-list { list-style: none; padding: 0; }
        .lesson-item {
            padding: 15px 20px;
            cursor: pointer;
            font-size: 0.85rem;
            border-bottom: 1px solid var(--border);
            transition: all 0.2s;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .lesson-item:hover { background: rgba(99, 102, 241, 0.05); color: var(--primary); }
        .lesson-item.active {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            font-weight: 700;
            border-left: 4px solid var(--primary);
        }
        .video-container {
            border-radius: 16px;
            overflow: hidden;
            background: #000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .reading-time {
            background: #f8fafc;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.8rem;
            color: var(--secondary);
            margin-bottom: 25px;
            display: inline-block;
        }
        .module-tag {
            background: #e0e7ff;
            color: var(--primary);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: bold;
        }
        .article-body h3 { font-size: 1.5rem; margin: 25px 0 15px 0; color: var(--text-primary); border-left: 4px solid var(--primary); padding-left: 15px; }
        .article-body h4 { font-size: 1.1rem; margin: 20px 0 10px 0; color: var(--primary); }
        .article-body p { font-size: 1rem; line-height: 1.7; margin-bottom: 18px; color: var(--text-secondary); }
        .article-body ul, .article-body ol { margin-left: 25px; margin-bottom: 25px; color: var(--text-secondary); }
        .article-body li { margin-bottom: 10px; line-height: 1.5; }
        .lesson-counter { font-size: 0.85rem; color: var(--text-secondary); font-weight: 500; }

        .dark-theme .module-title { background: #0f172a; color: #94a3b8; }
        .dark-theme .reading-time { background: #1e293b; }
        .dark-theme .lesson-item:hover { background: rgba(255,255,255,0.05); }

        @media (max-width: 1024px) {
            .lms-container { grid-template-columns: 1fr; padding: 15px; }
            .lms-sidebar { height: auto; position: relative; top: 0; }
        }
      `}</style>
    </div>
  );
};

export default Learn;
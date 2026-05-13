import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "../style/Theme.css";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Namaste! I am your Stock Mentor AI. How can I help you today?", sender: "ai" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/api/ai/chat", { message: input });
            const aiMsg = { text: response.data.response, sender: "ai" };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { text: "Sorry, I'm facing a connection issue. Is the backend running?", sender: "ai" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chatbot-wrapper">
            {/* Floating Toggle Button */}
            <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "✕" : "🤖"}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window card glass">
                    <div className="chatbot-header">
                        <div className="ai-status"></div>
                        <h3>Stock Mentor AI</h3>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`message-bubble ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <div className="message-bubble ai typing">Thinking...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input 
                            type="text" 
                            placeholder="Ask me about stocks..." 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>➤</button>
                    </div>
                </div>
            )}

            <style jsx>{`
                .chatbot-wrapper { position: fixed; bottom: 30px; right: 30px; z-index: 9999; }
                .chatbot-toggle {
                    width: 60px; height: 60px; border-radius: 50%;
                    background: var(--primary); color: white;
                    border: none; font-size: 1.5rem; cursor: pointer;
                    box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
                    transition: all 0.3s; display: flex; align-items: center; justify-content: center;
                }
                .chatbot-toggle:hover { transform: scale(1.1); }
                
                .chatbot-window {
                    position: absolute; bottom: 80px; right: 0;
                    width: 350px; height: 500px; display: flex; flex-direction: column;
                    padding: 0; overflow: hidden; border-radius: 20px;
                    animation: slideUp 0.3s ease-out;
                }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

                .chatbot-header {
                    background: var(--primary); color: white; padding: 20px;
                    display: flex; align-items: center; gap: 10px;
                }
                .ai-status { width: 10px; height: 10px; background: #10b981; border-radius: 50%; box-shadow: 0 0 10px #10b981; }

                .chatbot-messages {
                    flex: 1; overflow-y: auto; padding: 20px;
                    display: flex; flex-direction: column; gap: 15px;
                }
                .message-bubble {
                    max-width: 80%; padding: 12px 16px; border-radius: 15px;
                    font-size: 0.9rem; line-height: 1.4;
                }
                .message-bubble.ai { 
                    align-self: flex-start; background: #f1f5f9; color: #1e293b;
                    border-bottom-left-radius: 2px;
                }
                .message-bubble.user { 
                    align-self: flex-end; background: var(--primary); color: white;
                    border-bottom-right-radius: 2px;
                }
                .message-bubble.typing { font-style: italic; opacity: 0.7; }

                .chatbot-input {
                    padding: 15px; border-top: 1px solid var(--border);
                    display: flex; gap: 10px; background: white;
                }
                .chatbot-input input {
                    flex: 1; border: none; outline: none; font-size: 0.9rem;
                }
                .chatbot-input button {
                    background: transparent; border: none; color: var(--primary);
                    font-size: 1.2rem; cursor: pointer;
                }

                .dark-theme .chatbot-window { background: #1e293b; border-color: #334155; }
                .dark-theme .message-bubble.ai { background: #0f172a; color: white; }
                .dark-theme .chatbot-input { background: #1e293b; border-color: #334155; }
                .dark-theme .chatbot-input input { background: transparent; color: white; }

                @media (max-width: 480px) {
                    .chatbot-window { width: calc(100vw - 40px); height: 80vh; right: -10px; }
                }
            `}</style>
        </div>
    );
};

export default Chatbot;

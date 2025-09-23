import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = { 
      sender: "user", 
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    try {
      const reply = await sendMessage(input);
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: "ai", 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const suggestedQuestions = [
    "How can I manage anxiety?",
    "What are some coping strategies for stress?",
    "How to improve my sleep quality?",
    "Tips for maintaining positive mental health"
  ];

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>Welcome to MindCare AI</h3>
            <p>I'm here to provide mental health support and motivation.</p>
            <p>How can I help you today?</p>
            <div className="suggested-questions">
              {suggestedQuestions.map((question, index) => (
                <button 
                  key={index} 
                  className="question-chip"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            <div className="message-content">
              <p>{m.text}</p>
              <div className="message-timestamp">{m.timestamp}</div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai">
            <div className="typing-indicator">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input-container">
        <textarea
          ref={textareaRef}
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="1"
          disabled={isTyping}
        />
        <button 
          className="send-button" 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
        >
          Send
        </button>
      </div>
    </div>
  );
}

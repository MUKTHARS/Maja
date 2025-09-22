import { useState } from "react";
import { sendMessage } from "../api";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    const reply = await sendMessage(input);
    setMessages(prev => [...prev, { sender: "ai", text: reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ height: "400px", overflowY: "scroll", border: "1px solid #ccc", padding: "0.5rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ textAlign: m.sender === "user" ? "right" : "left" }}>
            <p><strong>{m.sender}:</strong> {m.text}</p>
          </div>
        ))}
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="Ask about mental health..." 
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

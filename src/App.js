import { useState } from "react";
import ChatBox from "./components/ChatBox";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container">
        <div className="hero-section">
          <h1>Mental Wellness Companion</h1>
          <p>Your empathetic AI assistant for mental health support and motivation</p>
        </div>
        <ChatBox />
      </div>
    </div>
  );
}

export default App;
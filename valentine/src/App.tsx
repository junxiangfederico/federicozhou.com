import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Location from "./pages/Location";

const loveMessages: string[] = [
  "I love you ❤️", "Ti amo 💕", "Je t’aime 💖", "Te quiero 💘",
  "Ich liebe dich 💝", "愛してる 💞", "사랑해 💓", "Я люблю тебя 💗",
  "Te iubesc 💕", "Eu te amo ❤️", "Kocham cię 💖", "Σ' αγαπώ 💘",
  "Ani ohev otach 💝", "Mahal kita 💞", "Volim te 💓", "Milujem ťa 💗",
  "Ngiyakuthanda 💕", "Aš tave myliu ❤️", "Es tevi mīlu 💖", "Szeretlek 💘",
  "Ma armastan sind 💝"
];

const Home = () => {
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % loveMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.title = loveMessages[index];
  }, [index]);

  return (
    <div>
      <h1>Happy Valentine's day Amy! 💙</h1>
      <img src="/heart_cat.gif" alt="Cute heart cat" width="300" />
      <br></br>
      <button onClick={() => navigate("/map")}>Let's get started</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Location />} />
      </Routes>
    </Router>
  );
}

export default App;
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Location from "./pages/location/Location";
import 'bootstrap/dist/css/bootstrap.min.css';
import heart_cat from "../public/heart_cat.gif";
import Ending from "./pages/ending/Ending";

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
      <div className="text-center">
        <h1
          style={{
            fontFamily: 'cursive',
            fontSize: '4rem',
            color: '#ffffff',
            textAlign: 'center',
            fontWeight: 'bold',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
          }}
        >
          Happy Valentine's day Amy! 💙
        </h1>
        <br />
        <img
          src={heart_cat}
          alt="Cute heart cat"
          width="300"
          key={index}
        />
        <br />
        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/map")}
          style={{ backgroundColor: 'white', borderColor: 'red', color: 'black', fontSize: '20px', fontFamily: 'Gill Sans' }}
        >
          Let's get started
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Location />} />
        <Route path="/next" element={<Ending />} />
      </Routes>
    </Router>
  );
}

export default App;
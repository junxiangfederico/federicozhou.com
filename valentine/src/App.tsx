import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import heart_cat from "../public/heart_cat.gif";
import Ending from "./pages/Ending/Ending";
import Location from "./pages/Location/Location";
import { Angry } from "./pages/Angry/Angry";

const loveMessages: string[] = [
  "I love you ❤️", "Ti amo 💕", "Je t’aime 💖", "Te quiero 💘",
  "Ich liebe dich 💝", "愛してる 💞", "사랑해 💓", "Я люблю тебя 💗",
  "Te iubesc 💕", "Eu te amo ❤️", "Kocham cię 💖", "Σ' αγαπώ 💘",
  "Ani ohev otach 💝", "Mahal kita 💞", "Volim te 💓", "Milujem ťa 💗",
  "Ngiyakuthanda 💕", "Aš tave myliu ❤️", "Es tevi mīlu 💖", "Szeretlek 💘",
  "Ma armastan sind 💝"
];

const copies: string[] = [
  "No",
  "Wrong button",
  "Try again",
  "Hey, what are you doing?",
  "I think you are pressing the wrong one",
  "Are you sure about that?",
  "Oops, that's not an option!",
  "Nice try, but no escape!",
  "You're just playing hard to get, aren't you?",
  "Denied! The other button is the right one",
  "Not the right choice, try again 💕",
  "Are you teasing me? 🥺",
  "Pressing 'No' just makes me ask again!",
  "Haha, funny joke! Now press 'Yes'!",
  "You can't escape fate 😘",
  "Aww, but I made this just for you!",
  "What if I throw in chocolates? 🍫",
  "Your finger keeps slipping, I get it",
  "You don't want to see me sad, do you? 😢",
  "The more you press, the more I fall for you 😍",
  "If I say 'pretty please?', will that help? 🥰",
  "Fiiiiiiiiineeeeee"
];

const Home = () => {
  const [index, setIndex] = useState<number>(0);
  const navigate = useNavigate();

  const [copyIndex, setCopyIndex] = useState<number>(0);
  const [text, setText] = useState<String>(copies[copyIndex]); 

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
        <h1>Will you be my Valentine ?</h1>
          <div style={{ 
          position: "absolute", 
          bottom: "20px", // Position at the bottom
          left: "50%", // Center horizontally
          transform: "translateX(-50%)", // Center horizontally
          zIndex: 1,
          display: "flex",
          gap: "20px", // Space between buttons
          }}>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate("/map")}
              style={{ 
                backgroundColor: 'white', 
                borderColor: 'red', 
                color: 'black', 
                fontSize: '20px', 
                fontFamily: 'Gill Sans',
                width: '300px'
              }}
            >
              Of course!
            </button>

            <button
              className="btn btn-primary mt-4"
              onClick={() => {
                  if (copyIndex >= copies.length - 1) {
                    navigate("/angry");
                  } else {
                    const newCopyIndex = copyIndex + 1;
                    setCopyIndex(newCopyIndex);
                    setText(copies[newCopyIndex]);
                  }
                }
              }
              style={{ 
                backgroundColor: 'white', 
                borderColor: 'red', 
                color: 'black', 
                fontSize: '20px', 
                fontFamily: 'Gill Sans',
                width: '100%'
              }}
            >
              {text}
            </button>
        </div>
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
        <Route path="/ending" element={<Ending />} />
        <Route path="/angry" element={<Angry />} />
      </Routes>
    </Router>
  );
}

export default App;
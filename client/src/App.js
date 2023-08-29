import React from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "./Navbar";
import Typed from "typed.js";
import "./Navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Info from "./Info";
import Contact from "./Contact";
import Chat from "./Chat";
import Home from "./Home";

function Typing() {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Welcome to HMU ^2000", "Make friends online ^2000"],
      typeSpeed: 70,
      backSpeed: 70,
      loop: true,
      loopCount: Infinity,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      <h1 className="title">
        <span ref={el} />
      </h1>
    </div>
  );
}
function App() {
  const [theme, setTheme] = useState({
    background: "linear-gradient(153deg, #a650bc, #c1a1c4)",
    color: "black",
  });

  const bgTheme = () => {
    if (theme.color === "black") {
      setTheme({
        background: "linear-gradient(180deg, black, #565454)",
        color: "white",
      });
    } else {
      setTheme({
        background: "linear-gradient(153deg, #a650bc, #c1a1c4)",
        color: "black",
      });
    }
  };
  return (
    <Router>
      <div className="app" style={theme}>
        <Typing />
        <Navbar bgTheme={bgTheme} />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/info" element={<Info />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/chat" element={<Chat />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

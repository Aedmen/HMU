import React from "react";
import Reciever from "./Reciever";
import Sender from "./Sender";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <Sender />
      <Reciever />
      <Link to="/chat">
        <button className="btn">Submit</button>
      </Link>
    </div>
  );
}

export default Home;

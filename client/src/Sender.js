import React, { createContext, useState } from "react";
import "./Sender.css";
import Chat from "./Chat"
// Use create context and transfer name from here to chat and rest is already done. Once that's done then do similarly with the rest and website is complete!!!!!
function Sender() {
  const [name,setName] = useState("");
  const nameUser = createContext();
  return (
    <div className="senddet">
      <h2 className="sendhead">About you (optional)</h2>
      <ul className="sendinp">
        <li className="nameli">
          <label htmlFor="name">Name: </label>
          <input type="text" onChange={(data) => {
              setName(data.target.value);
            }}/>
        </li>
        <li className="genderli">
          <label htmlFor="gender">Gender: </label>
          <ul className="genderul">
            <li>
              <label htmlFor="male">Male</label>
              <input type="radio" />
            </li>
            <li>
              <label htmlFor="female">Female</label>
              <input type="radio" />
            </li>
            <li>
              <label htmlFor="others">Others</label>
              <input type="radio" />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sender;

import "./Reciever.css";
import React from "react";

function Reciever() {
  return (
    <div className="recievedet">
      <h2 className="recievehead">About your interest (optional)</h2>
      <ul className="recieveinp">
        <li className="nameli">
          <label htmlFor="name">Name: </label>
          <input type="text" />
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
        <li>
          <label htmlFor="interest">Interests: </label>
          <input type="text" />
        </li>
        <li>
          <label htmlFor="location">Allow HMU to access your location: </label>
          <input type="radio" />
        </li>
      </ul>
    </div>
  );
}

export default Reciever;

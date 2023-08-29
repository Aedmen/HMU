import React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import "./Navbar.css";

function Navbar(props) {
  const home = <HomeIcon />;
  const info = <InfoIcon />;
  const contact = <ContactPageIcon />;
  const bgTheme = props.bgTheme;

  const dark = <DarkModeIcon />;
  const light = <LightModeIcon />;

  const [icon, setIcon] = useState({
    img: dark,
    text: "dark",
  });
  const themeIcon = () => {
    if (icon.text === "dark") {
      setIcon({
        img: light,
        text: "light",
      });
    } else {
      setIcon({
        img: dark,
        text: "dark",
      });
    }
  };

  const [color, setColor] = useState({
    filter: "invert(0%)",
  });
  const icocolor = () => {
    if (color.filter === "invert(0%)") {
      setColor({
        filter: "invert(100%)",
      });
    } else {
      setColor({
        filter: "invert(0%)",
      });
    }
  };
  return (
    <div>
      <ul className="navul">
        <li>
          <IconButton style={color} className="icon">
            <Link to="/" target="__blank">
              {home}
            </Link>
          </IconButton>
        </li>
        <li>
          <IconButton style={color} className="icon">
            <Link to="/info" target="__blank">
              {info}
            </Link>
          </IconButton>
        </li>
        <li>
          <IconButton style={color} className="icon">
            <Link to="/contact" target="__blank">
              {contact}
            </Link>
          </IconButton>
        </li>
        <li>
          <IconButton
            className="icobtn"
            style={color}
            onClick={() => {
              bgTheme();
              themeIcon();
              icocolor();
            }}
          >
            {icon.img}
          </IconButton>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

import React from "react";
import { Fa500Px } from "react-icons/fa";
import "./header.css";
import NavBar from "../Navigation/NavBar";

const Header = ({ text }) => {
  return (
    <header>
      <div className="logo">
        <span className="text">{text}</span>
        <span className="icon">
          <Fa500Px />
        </span>
      </div>
      <NavBar />
    </header>
  );
};

Header.defaultProps = {
  text: "Todo-List",
};

export default Header;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import * as FaIcon from "react-icons/fa";

const NavBar = () => {
  const [sidebar, setSidebar] = useState(false);
  const toggle = () => {
    let currState = sidebar;
    let newState = !currState;
    setSidebar(newState);
  };
  return (
    <nav>
      <button
        onClick={toggle}
        className={sidebar ? "toggle active" : "toggle"}
      ></button>
      <ul className={sidebar ? "navList active" : "navList"}>
        <Link to="/">
          <li className="navItem btn btn-danger" onClick={toggle}>
            <FaIcon.FaHome className="icon" />
          </li>
        </Link>
        <Link to="/todoapp/add">
          <li className="navItem btn btn-danger" onClick={toggle}>
            <FaIcon.FaPlus className="icon" />
          </li>
        </Link>
        <Link to="/todoapp/info">
          <li className="navItem btn btn-danger" onClick={toggle}>
            <FaIcon.FaInfo className="icon" />
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;

import "./NavbarStyle.css";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-title">
        <a href="#/welcome" className="title">
          Minutes Tracker
        </a>
      </div>
      <div className="nav-buttons">
        <Link to="/addprofile">
          <button className="btn">Add Profile</button>
        </Link>
        <Link to="/dragonstatistics">
          <button className="btn">Dragon Statistics</button>
        </Link>
        <Link to="/settings">
          <button className="btn">Settings</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

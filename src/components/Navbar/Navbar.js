import "./NavbarStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  const navigate = useNavigate();
  
	const handleLogout = (event) => {
		event.preventDefault();
		if (window.confirm("Are you sure you want to Log Out?")) {
			localStorage.removeItem('userJSON');
			axios.post('/Logout')
			navigate('/');
		}
	};
  
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
        <button className = "logoutbtn" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
};

export default Navbar;

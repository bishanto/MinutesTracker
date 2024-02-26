import "./NavbarStyle.css";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar';

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
    <Navbar collapseOnSelect expand="lg" className="navbar"> 
    <Nav.Link href="#/welcome"> <img class="logo" src="/images/dragonLogo.png" alt="Dragon_Logo"></img></Nav.Link>
            <Navbar.Brand href="#/welcome"> 
                <span class = "title">Dragon Minutes</span> 
            </Navbar.Brand> 
            <Navbar.Toggle 
                aria-controls="responsive-navbar-nav" /> 
            <Navbar.Collapse id="responsive-navbar-nav"> 
                <Nav className="m-auto"> 
                    <Nav.Link href="#/addprofile">
                        <span class = "btn">Add Profile</span> 
                    </Nav.Link> 
                    <Nav.Link href="#/dragonstatistics"> 
                        <span class = "btn">Dragon Statistics</span> 
                    </Nav.Link> 
                </Nav> 
                <Nav> 
                    <Nav.Link href="#/settings"> 
                        <span class = "btn">Settings</span> 
                    </Nav.Link> 
        
                    <Nav.Link onClick={handleLogout}> 
                        <span class = "btn" id = "logoutbtn">Logout</span> 
                    </Nav.Link> 
                </Nav> 
            </Navbar.Collapse> 
        
    </Navbar>
  );
};

export default NavbarComponent;

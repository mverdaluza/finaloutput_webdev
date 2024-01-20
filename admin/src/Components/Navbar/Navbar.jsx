import React from "react";
import { Link } from 'react-router-dom';  // Make sure to import Link from react-router-dom
import './Navbar.css';
import navlogo from '../../assets/styleslogo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="nav-logo">
                <Link to='/'><img src={navlogo} alt="" className="nav-logo" /></Link>
                {localStorage.getItem("auth-token") ? (
                <li onClick={() => {localStorage.removeItem("auth-token"); window.location.replace('/')}}><span>Logout</span></li>
                ):(<li><Link style={{ textDecoration: "none", color: "white" }}  to="/adminlogin">Login</Link></li>
                )}
            </div>
        </div>
    );
}

export default Navbar;

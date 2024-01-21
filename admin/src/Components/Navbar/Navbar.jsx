import React from "react";
import { Link, useNavigate  } from 'react-router-dom';  // Make sure to import Link from react-router-dom
import './Navbar.css';
import navlogo from '../../assets/styleslogo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        navigate('/');
        console.log('User is logout');
    };

     // Check if the user is logged in
     if (localStorage.getItem("auth-token")) {
        console.log("User is logged in");
    }

    return (
        <div className="navbar">
        <div className="nav-logo">
            <Link to='/'>
                <img src={navlogo} alt="" className="nav-logo" />
            </Link>
            {localStorage.getItem("auth-token") ? (
                <li onClick={handleLogout}><span>Logout</span></li>
            ) : (
                <li>
                    <Link style={{ textDecoration: "none", color: "white" }} to="/adminlogin">
                        Login
                    </Link>
                </li>
            )}
        </div>
    </div>
    );
}

export default Navbar;

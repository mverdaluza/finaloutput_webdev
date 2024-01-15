import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo2 from "../Assets/logo2.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import dropdown from "../Assets/dropdown.png";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo2} alt=""></img>
        </Link>
        <Link to="/">
          <p>MARKETPLACE</p>
        </Link>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("tops")}>
          <Link style={{ textDecoration: "none" }} to="/tops">
            Tops
          </Link>
          {menu === "tops" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("buttom")}>
          <Link style={{ textDecoration: "none" }} to="/buttom">
            Buttom
          </Link>
          {menu === "buttom" ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu("dress")}>
          <Link style={{ textDecoration: "none" }} to="/dress">
            Dress
          </Link>
          {menu === "Dress" ? <hr /> : <></>}
        </li>
        {localStorage.getItem("auth-token") ? (
          <li onClick={() => {localStorage.removeItem("auth-token"); window.location.replace('/')}}>
            <span>Logout</span>
          </li>
        ) : (
          <li>
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </li>
        )}
        <li>
          <Link to="/cart">
            <img src={cart_icon} alt="" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

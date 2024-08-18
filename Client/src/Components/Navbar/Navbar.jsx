import React from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
// import cart_icon from "../Assets/cart_icon.png";
import nav_dropdown from "../Assets/nav_dropdown.png";
import { Link } from "react-router-dom";

// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";

import { Dropdown, DropdownButton } from "react-bootstrap"; 

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <div className="navbar">
      <Link to="/homeuser" className="nav-logo">
        <img src={logo} alt="" />
        <p>Online Shopping Center</p>
      </Link>
      <img className="nav-dropdown" src={nav_dropdown} alt="" />
      <ul className="nav-menu">
        <li>
          <Link class="a" to="/homeuser">
            Home
          </Link>
        </li>

<li><div class="a" >
        <DropdownButton id="dropdown" title="Category">
            <Dropdown.Item href="/homeuser/category/cloth">Cloths</Dropdown.Item>
            <Dropdown.Item href="/homeuser/category/cloth">Home & Kitchen</Dropdown.Item>
            <Dropdown.Item href="/homeuser/category/cloth">Electronics</Dropdown.Item>
            <Dropdown.Item href="/homeuser/category/cloth">Books</Dropdown.Item>
            <Dropdown.Item href="/homeuser/category/other">Other</Dropdown.Item>
          </DropdownButton>
          </div>
</li>
        <li>
          <Link class="a" to="/homeuser/profile">
          Profile 
          </Link>
        </li>
        <li>
          <Link class="a" to="/homeuser/about">
            About
          </Link>
        </li>
      </ul>
      <div className="nav-login-cart">
        <Link to="/">
          <button>Logout</button>
        </Link>
        {/* <Link to="/homeuser">
          <img src={cart_icon} alt="" />
        </Link> */}
        {/* <div className="nav-cart-count">{getTotalCartItems()}</div> */}
        {user && (
          <span>
            <h5 className="user-welcome">Welcome, {user.name}</h5>
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;

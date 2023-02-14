import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar_search">
        <span className="search_sec__searchLogo">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Search for Places"
          className="search_sec__text"
        />
      </div>
      <div className="navbar_icons">
        <i className="fas fa-user" onClick={() => navigate("/logout")}></i>
        <i className="fas fa-moon"></i>
      </div>
    </div>
  );
};

export default Navbar;

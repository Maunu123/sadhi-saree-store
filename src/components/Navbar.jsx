import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import { FaSearch, FaUser } from "react-icons/fa";

import { CartContext } from "../context/CartContext";

import "./Navbar.css";
import lotusLogo from "../assets/f.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useContext(CartContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");

  const showSearch = location.pathname === "/shop" || location.pathname === "/new-arrival";

  const handleSearch = () => {
    if (search.trim() === "") return;

    navigate(`/shop?search=${encodeURIComponent(search.trim())}`);

    // Clear search box after searching
    setSearch("");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={lotusLogo} alt="logo" className="logo-img" />

        <div className="logo-text">
          <h2>SADHI</h2>
          <p>SAREE SHOP</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="page-link">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/new-arrival">New Arrival</NavLink>
      </div>

      {/* Right Side Icons */}
      <div className="nav-icons">
        {/* Search */}
        {showSearch && (
          <div className="search-box">
            <input
              type="text"
              placeholder="Search collection"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <FaSearch className="search-icon" onClick={handleSearch} />
          </div>
        )}

        {/* User */}
        <Link to={currentUser ? "/user" : "/login"} className="user-icon nav-round-icon">
          <FaUser className="icon" />
        </Link>
        {/* Wishlist */}
        <Link to="/wishlist" className="wishlist-icon nav-round-icon">
          <FiHeart />

          {wishlistCount > 0 && (
            <span className="wishlist-count">{wishlistCount}</span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" className="cart-icon nav-round-icon">
          <FiShoppingBag />

          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

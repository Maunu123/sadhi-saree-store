import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import "./User.css";

function User() {
  const navigate = useNavigate();

  const { currentUser, updateProfile, logout } = useAuth();

  const address = JSON.parse(localStorage.getItem("address")) || {};

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(currentUser?.name || "");

  const [email, setEmail] = useState(currentUser?.email || "");

  const [phone, setPhone] = useState(currentUser?.phone || "");

  const saveProfile = () => {
    updateProfile({
      name,
      email,
      phone,
    });

    alert("Profile Updated Successfully ✅");

    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <div className="user-page">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />

        <h2>Hello, {currentUser?.name} 👋</h2>

        <p>Welcome to SADHI Saree Store</p>

        <div className="dashboard">
          <Link to="/orders" className="card">
            <FaShoppingBag />
            <span>My Orders</span>
          </Link>

          <Link to="/wishlist" className="card">
            <FaHeart />
            <span>Wishlist</span>
          </Link>

          <Link to="/cart" className="card">
            <FaShoppingCart />
            <span>My Cart</span>
          </Link>

          <div className="card">
            <FaMapMarkerAlt />

            <span>
              {address.city
                ? `${address.city}, ${address.state}`
                : "No Address"}
            </span>
          </div>

          <div className="card" onClick={() => setIsEditing(true)}>
            <FaEdit />
            <span>Edit Profile</span>
          </div>

          <div className="card logout" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </div>

        {isEditing && (
          <div className="edit-profile">
            <h3>Edit Profile</h3>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="edit-buttons">
              <button onClick={saveProfile}>Save</button>

              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;

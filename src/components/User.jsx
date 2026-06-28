import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaShoppingBag,
  FaHeart,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaEdit,
  FaSignOutAlt,
} from "react-icons/fa";
import "./User.css";
import { useState } from "react";

function User() {
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(localStorage.getItem("name") || "Your Name");

  const [phone, setPhone] = useState(
    localStorage.getItem("phone") || "9876543210",
  );

  const [email, setEmail] = useState(localStorage.getItem("email") || "email");

  const [city, setCity] = useState(localStorage.getItem("city") || "city");

  const [state, setState] = useState(localStorage.getItem("state") || "state");
  const [pincode, setPincode] = useState(
    localStorage.getItem("pincode") || "pincode",
  );
  const saveProfile = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("city", city);

    localStorage.setItem("state", state);

    localStorage.setItem("pincode", pincode);

    alert("Profile Updated Successfully ✅");
    setIsEditing(false);

    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setState("");
    setPincode("");
    setIsEditing(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [isEditing]);

  return (
    <div className="user-page">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />

        <h2>Hello, Rimjhim 👋</h2>

        <p>Welcome to SADHI Saree Store</p>

        <div className="dashboard">
          <Link to="/checkout" className="card">
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
              {city && state && pincode
                ? `${city}, ${state}, ${pincode}`
                : "No Address"}
            </span>
          </div>

          <div className="card" onClick={() => setIsEditing(true)}>
            <FaEdit />
            <span>Edit Profile</span>
          </div>

          <div className="card logout" onClick={() => alert("Logged Out")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </div>
      </div>
      {isEditing && (
        <div className="modal-overlay">
          <div className="edit-profile">
            <div className="header">
              <h3>Edit Profile</h3>
            </div>
            <div className="edit-wrapper">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>

              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <input
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />

              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <div className="edit-buttons">
                <button onClick={saveProfile}>Save</button>

                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;

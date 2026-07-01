import React, { useContext } from "react";
import { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const placeOrder = () => {
    localStorage.removeItem("cart");

    alert("Order Placed Successfully 🎉");

    navigate("/order-success");
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const saveAddress = () => {
    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("Please fill all fields.");
      return;
    }

    const userAddress = {
      name,
      phone,
      address,
      city,
      state,
      pincode,
    };

    localStorage.setItem("address", JSON.stringify(userAddress));

    alert("Address Saved Successfully ✅");

    setName("");
    setPhone("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

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

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      ></textarea>

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

      <button className="save-btn" onClick={saveAddress}>
        Save Address
      </button>
      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>
      <button className="continue-btn"  onClick={() => navigate("/payment")}>Continue to Payment</button>
    </div>
  );
}

export default Checkout;

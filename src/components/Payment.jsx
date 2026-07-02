import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("");

  const total = localStorage.getItem("total") || 0;

  const handlePayment = () => { 
    if (!paymentMethod) { 
        alert("Please select a payment method"); 
        return; 
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      userId: currentUser?.id,
      items: cart,
      paymentMethod,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Payment Successful 🎉");

    clearCart(); 
    navigate("/order-success"); 
  };
  return (
    <div>
      <div className="payment-page">
        <div className="payment-card">
          <h1>Payment</h1>
          <p>Select your payment method</p>
          <div className="payment-option">
            <label>
              <input
                type="radio"
                name="payment"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              UPI{" "}
            </label>{" "}
            <label>
              {" "}
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Debit / Credit Card{" "}
            </label>{" "}
            <label>
              {" "}
              <input
                type="radio"
                name="payment"
                value="Net Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Net Banking{" "}
            </label>{" "}
            <label>
              {" "}
              <input
                type="radio"
                name="payment"
                value="Cash On Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />{" "}
              Cash On Delivery{" "}
            </label>{" "}
          </div>{" "}
          <div className="payment-total">
            {" "}
            <h2>Total Amount</h2> <h3>₹{total}</h3>{" "}
          </div>{" "}
          <button className="pay-btn" onClick={handlePayment}>
            {" "}
            Pay Now{" "}
          </button>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default Payment;

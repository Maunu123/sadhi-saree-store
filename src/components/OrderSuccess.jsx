import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Payment Successful!</h1>

        <p>
          Thank you for shopping with <strong>SADHI</strong>.
        </p>

        <p>
          Your order has been placed successfully.
        </p>

        <button
          className="success-btn"
          onClick={() => navigate("/shop")}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderSuccess;
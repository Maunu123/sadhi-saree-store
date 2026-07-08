import React from "react";
import "./Policy.css";

const ShippingPolicy = () => {
  return (
    <div className="policy-page">
      <h1>Shipping Policy</h1>

      <div className="policy-section">
        <h3>Order Processing</h3>
        <p>
          Orders are processed within 1–2 business days after successful payment
          confirmation.
        </p>

        <h3>Delivery Time</h3>
        <p>
          Standard delivery takes approximately 3–7 business days across India.
          Delivery times may vary during festivals or due to weather conditions.
        </p>

        <h3>Shipping Charges</h3>
        <ul>
          <li>Free Shipping on orders above ₹999.</li>
          <li>₹99 shipping charge for orders below ₹999.</li>
        </ul>

        <h3>Order Tracking</h3>
        <p>
          A tracking number will be shared via email or SMS once your order has
          been dispatched.
        </p>

        <h3>Delivery Attempts</h3>
        <p>
          Our courier partner will make multiple delivery attempts. If the order
          cannot be delivered, it may be returned to us.
        </p>

        <h3>Damaged Package</h3>
        <p>
          If the package appears damaged, please refuse delivery or contact our
          customer support immediately.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;

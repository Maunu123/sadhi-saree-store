import React from "react";
import "./Policy.css";

const ReturnPolicy = () => {
  return (
    <div className="policy-page">
      <h1>Return & Refund Policy</h1>

      <div className="policy-section">
        <h3>Easy Returns</h3>
        <p>
          We offer a 7-day return policy for eligible products from the date of
          delivery.
        </p>

        <h3>Return Conditions</h3>
        <ul>
          <li>Item must be unused and unwashed.</li>
          <li>Original tags and packaging should be intact.</li>
          <li>Return request must be raised within 7 days.</li>
        </ul>

        <h3>Non-Returnable Items</h3>
        <ul>
          <li>Customized products.</li>
          <li>Products without original tags.</li>
          <li>Used or damaged items.</li>
        </ul>

        <h3>Refund Process</h3>
        <p>
          Once the returned product passes quality inspection, your refund will
          be processed within 5–7 business days to the original payment method.
        </p>

        <h3>Exchange</h3>
        <p>
          Exchanges are available for size or damaged products, subject to stock
          availability.
        </p>

        <h3>Need Help?</h3>
        <p>
          Contact our support team at support@sareehub.com or call +91 98765
          43210.
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;

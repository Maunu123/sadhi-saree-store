import React from "react";
import "./Policy.css";

const Faq = () => {
  return (
    <div className="policy-page">
      <h1>Frequently Asked Questions (FAQs)</h1>

      <div className="policy-section">
        <h3>1. How can I place an order?</h3>
        <p>
          Browse our collection, select your favorite saree, choose the
          quantity, and click "Add to Cart". Proceed to checkout and complete
          the payment to place your order.
        </p>

        <h3>2. What payment methods do you accept?</h3>
        <p>
          We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on
          Delivery (available for selected locations).
        </p>

        <h3>3. How long does delivery take?</h3>
        <p>
          Orders are usually delivered within 3–7 business days depending on
          your location.
        </p>

        <h3>4. Can I cancel my order?</h3>
        <p>
          Yes. Orders can be cancelled before they are shipped. Once shipped,
          cancellation is not possible.
        </p>

        <h3>5. How can I track my order?</h3>
        <p>
          Once your order is shipped, you'll receive a tracking ID via email or
          SMS.
        </p>

        <h3>6. Do you offer international shipping?</h3>
        <p>
          Currently we deliver only across India. International shipping will be
          available soon.
        </p>
      </div>
    </div>
  );
};

export default Faq;

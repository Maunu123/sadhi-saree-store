import React, { useState, useContext } from "react";
import "./ShopDetails.css";
import { useParams } from "react-router-dom";
import { productList } from "../util/helper";
import { CartContext } from "../context/CartContext";

const Details = () => {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useContext(CartContext);

  const product = productList.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [rating, setRating] = useState(product.rating);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const handleCheckPincode = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus({ success: false, message: "❌ Invalid pincode. Please enter a valid 6-digit number." });
      return;
    }
    setPincodeStatus({ success: true, message: "🚚 Express Delivery is available for this location! Estimated delivery by Saturday." });
  };

  return (
    <>
      <div className="details-container">
        <div className="details-image">
          <img className="main-image" src={selectedImage} alt={product.name} />

          <div className="thumbnail-container">
            {product.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={product.name}
                className="thumbnail"
                onClick={() => setSelectedImage(item)}
              />
            ))}
          </div>
        </div>

        <div className="details-content">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>

          <div className="pricing-box">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && <span className="original-price">₹{product.originalPrice}</span>}
            {product.discount && <span className="discount-tag">{product.discount}</span>}
          </div>

          <p className="description">{product.description}</p>

          <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
            <p className="rating" style={{ margin: 0 }}>
              <strong>Rating:</strong> ⭐ {rating}
            </p>
            <p className="reviews" style={{ margin: 0 }}>
              <strong>Reviews:</strong> {product.reviews} verified reviews
            </p>
          </div>

          <div className="rate-product" style={{ marginTop: "10px", marginBottom: "20px" }}>
            <h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>Rate this Product</h4>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ fontSize: "24px", cursor: "pointer", marginRight: "5px", color: star <= rating ? "#ff3f6c" : "#ccc" }}
              >
                ★
              </span>
            ))}
          </div>

          <div className="action-buttons">
            <button className="cart-btn" onClick={() => addToCart(product)}>
              Add To Cart
            </button>

            <button className="wishlist-btn" onClick={() => addToWishlist(product)}>
              ♡ Wishlist
            </button>
          </div>

          {/* Interactive Pincode Estimator */}
          <div className="pincode-checker-section" style={{
            marginTop: "25px",
            padding: "15px 20px",
            background: "#f9f9f9",
            borderRadius: "10px",
            border: "1px solid var(--border-color, #e0e0e0)",
            textAlign: "left"
          }}>
            <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#333", fontWeight: "600" }}>🚚 Check Delivery & Cash on Delivery</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                maxLength="6"
                placeholder="Enter 6-digit Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "14px"
                }}
              />
              <button
                onClick={handleCheckPincode}
                style={{
                  padding: "10px 20px",
                  background: "var(--primary-color, #ff3f6c)",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                Check
              </button>
            </div>
            {pincodeStatus && (
              <p style={{
                margin: "10px 0 0 0",
                fontSize: "13px",
                fontWeight: "600",
                color: pincodeStatus.success ? "green" : "red"
              }}>
                {pincodeStatus.message}
              </p>
            )}
          </div>

          {/* Dynamic Scrollable Bank Offers Section */}
          {product.offers && product.offers.length > 0 && (
            <div className="offers-section">
              <h3>🏷️ Available Bank Offers</h3>
              <div className="offer-cards" style={{ maxHeight: "150px", overflowY: "auto", paddingRight: "5px" }}>
                {product.offers.map((offer) => (
                  <div key={offer.id} className="offer-card">
                    <span className="offer-badge">{offer.type}</span>
                    <p><strong>{offer.bank}:</strong> {offer.text}</p>
                    <small style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{offer.terms}</small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="trust-badges" style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "25px",
            padding: "15px 10px",
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
          }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "11px", color: "#666" }}>
              <span style={{ fontSize: "20px", marginBottom: "5px" }}>🛡️</span>
              <strong>100% Original Saree</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "11px", color: "#666" }}>
              <span style={{ fontSize: "20px", marginBottom: "5px" }}>🔄</span>
              <strong>7-Day Returns</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "11px", color: "#666" }}>
              <span style={{ fontSize: "20px", marginBottom: "5px" }}>🚚</span>
              <strong>Free Shipping</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, textAlign: "center", fontSize: "11px", color: "#666" }}>
              <span style={{ fontSize: "20px", marginBottom: "5px" }}>💳</span>
              <strong>Secure Payments</strong>
            </div>
          </div>

          {/* Premium Specifications & Story */}
          <div className="product-description-premium">
            <h3>Saree Story & Specifications</h3>
            <p className="story-text">
              {product.description} Handpicked from premium handlooms, this traditional masterpiece represents the absolute peak of authentic design and craftsmanship. Exquisitely crafted with rich, fine <strong>{product.fabric}</strong> threads, it boasts an elegant drape, lush texture, and luxurious border detailing designed to elevate your grace at every festive or grand celebration.
            </p>
            
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Brand</span>
                <span className="spec-value">{product.brand}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Saree Fabric</span>
                <span className="spec-value" style={{ textTransform: "capitalize" }}>{product.fabric}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Blouse Piece</span>
                <span className="spec-value">{product.blousePiece || "Included"}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color</span>
                <span className="spec-value" style={{ textTransform: "capitalize" }}>{product.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Saree Length</span>
                <span className="spec-value">{product.length || "5.5 Meters"}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Wash Care</span>
                <span className="spec-value">{product.washCare || "Dry Clean Only"}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Occasion</span>
                <span className="spec-value">{product.occasion || "Wedding & Festive"}</span>
              </div>
            </div>
            
            <div className="features-section">
              <h4>Highlights & Premium Features</h4>
              <ul className="features-list">
                {(product.features || ["Gold zari work", "Handcrafted design", "Lightweight fabric"]).map((feat, index) => (
                  <li key={index}>✨ {feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
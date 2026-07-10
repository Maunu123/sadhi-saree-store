import { useState, useContext } from "react";
import "./Cart.css";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { coupons, shippingPolicy } from "../util/offers";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, addToWishlist } =
    useContext(CartContext);

  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Dynamic Shipping logic from centralized policy:
  const shippingFee = total >= shippingPolicy.freeShippingThreshold ? 0 : shippingPolicy.standardShippingFee;

  // Dynamic Coupon discount calculation:
  const couponDiscount = appliedCoupon
    ? Math.round(total * (appliedCoupon.discountPercent / 100))
    : 0;

  const platformFee = 20;
  const finalTotal = total - couponDiscount + shippingFee + platformFee;

  const handleApplyCoupon = () => {
    const codeUpper = couponInput.trim().toUpperCase();
    const matched = coupons.find(c => c.code === codeUpper);

    if (matched) {
      if (total >= matched.minCartValue) {
        setAppliedCoupon(matched);
        setCouponError("");
      } else {
        setCouponError(`Min order of ₹${matched.minCartValue} required for coupon '${matched.code}'.`);
        setAppliedCoupon(null);
      }
    } else {
      setCouponError("Invalid Coupon Code. Try 'SADHI10' or 'SADHI50'");
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError("");
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        {/* Left Side */}
        <div className="cart-items" style={cart.length === 0 ? { flex: 1 } : {}}>
          {cart.length === 0 ? (
            <h2>Your Cart is Empty</h2>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.banner} alt={item.name} />

                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>

                  <div className="cart-buttons">
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                    <button
                      className="wishlist-btn"
                      onClick={() => addToWishlist(item)}
                    >
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Side - Only show if cart is not empty */}
        {cart.length > 0 && (
          <div className="price-details">
            <h3>Price Details</h3>

            {/* Coupons Section */}
            <div className="cart-coupons-section" style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 10px 0", fontSize: "14px", color: "var(--dark-color)", fontWeight: "700" }}>🎟️ APPLY COUPONS</h4>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Enter Coupon Code"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    fontSize: "13px",
                    margin: 0
                  }}
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    style={{
                      padding: "10px 15px",
                      background: "#757575",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer"
                    }}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    style={{
                      padding: "10px 15px",
                      background: "var(--primary-color)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontWeight: "600",
                      fontSize: "13px",
                      cursor: "pointer"
                    }}
                  >
                    Apply
                  </button>
                )}
              </div>
              {couponError && <p style={{ color: "red", fontSize: "12px", margin: "5px 0 0 0", fontWeight: "600" }}>{couponError}</p>}
              {appliedCoupon && <p style={{ color: "green", fontSize: "12px", margin: "5px 0 0 0", fontWeight: "600" }}>🎉 Coupon '{appliedCoupon.code}' applied successfully!</p>}
              
              {/* Available Coupons list */}
              {!appliedCoupon && coupons.map((c) => {
                const meetsMin = total >= c.minCartValue;
                return (
                  <div key={c.code} style={{
                    marginTop: "12px",
                    padding: "10px",
                    background: meetsMin ? "var(--light-pink-bg-tint)" : "#f5f5f5",
                    border: meetsMin ? "1px dashed var(--primary-color)" : "1px dashed #ccc",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ textAlign: "left" }}>
                      <strong style={{ fontSize: "12px", color: meetsMin ? "var(--primary-color)" : "#777", display: "block" }}>{c.code}</strong>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block" }}>{c.description}</span>
                      {!meetsMin && <span style={{ fontSize: "10px", color: "#d9534f", display: "block", fontWeight: "600" }}>Min. Order ₹{c.minCartValue} required</span>}
                    </div>
                    {meetsMin ? (
                      <button
                        onClick={() => {
                          setAppliedCoupon(c);
                          setCouponInput(c.code);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--primary-color)",
                          fontWeight: "700",
                          fontSize: "12px",
                          cursor: "pointer"
                        }}
                      >
                        APPLY
                      </button>
                    ) : (
                      <span style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>LOCKED</span>
                    )}
                  </div>
                );
              })}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid var(--light-gray-border)", margin: "20px 0" }} />

            <div className="price-row">
              <span>Price ({cart.length} Items)</span>
              <span>₹{total}</span>
            </div>

            <div className="price-row">
              <span>Discount</span>
              <span className="green">-₹{couponDiscount}</span>
            </div>

            <div className="price-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>

            <div className="price-row">
              <span>Delivery Charges</span>
              <span className={shippingFee === 0 ? "green" : ""}>
                {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
              </span>
            </div>

            <hr />

            <div className="price-total">
              <strong>Total Amount</strong>
              <strong>₹{finalTotal}</strong>
            </div>

            <button
              className="place-order-btn"
              onClick={() => {
                localStorage.setItem("total", finalTotal);
                navigate("/checkout/cart");
              }}
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
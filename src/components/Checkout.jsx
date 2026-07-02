import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { productList } from "../util/helper";
import { FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import "./Checkout.css";

function Checkout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  
  const product = productList.find((p) => p.id === Number(id));

  // Load saved address from localStorage
  const [savedAddress, setSavedAddress] = useState(() => {
    const addr = localStorage.getItem("address");
    return addr ? JSON.parse(addr) : null;
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
  const userName = localStorage.getItem("name") || currentUser?.name || "";

  const [name, setName] = useState(savedAddress?.name || userName || "");
  const [phone, setPhone] = useState(savedAddress?.phone || currentUser?.phone || "");
  const [address, setAddress] = useState(savedAddress?.address || "");
  const [city, setCity] = useState(savedAddress?.city || "");
  const [state, setState] = useState(savedAddress?.state || "");
  const [pincode, setPincode] = useState(savedAddress?.pincode || "");

  const isCartCheckout = id === "cart";
  
  const checkoutItems = isCartCheckout
    ? cart
    : product
      ? [{ ...product, quantity: 1 }]
      : [];

  const handleContinueToPayment = () => {
    if (!name || !phone || !address || !city || !state || !pincode) {
      alert("Please fill in your shipping details or select a saved address before continuing to payment.");
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
    
    // Save the checkout total to localStorage "total" so Payment page reads it correctly
    const checkoutTotal = isCartCheckout
      ? checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0) - 500 + 20
      : product ? product.price : 0;
      
    localStorage.setItem("total", checkoutTotal);
    
    navigate("/payment");
  };

  // Helper to check if current inputs match saved address
  const isSavedAddressActive = () => {
    if (!savedAddress) return false;
    return (
      name === savedAddress.name &&
      phone === savedAddress.phone &&
      address === savedAddress.address &&
      city === savedAddress.city &&
      state === savedAddress.state &&
      pincode === savedAddress.pincode
    );
  };

  const handleSelectSavedAddress = () => {
    if (savedAddress) {
      setName(savedAddress.name);
      setPhone(savedAddress.phone);
      setAddress(savedAddress.address);
      setCity(savedAddress.city);
      setState(savedAddress.state);
      setPincode(savedAddress.pincode);
    }
  };

  return (
    <div className="checkout-page-container">
      <div className="checkout-content">
        <h1>Checkout</h1>

        {userName && (
          <div className="login-welcome-banner">
            <FaCheckCircle className="banner-icon success" />
            <div className="banner-text">
              <h4>Welcome back, {userName}!</h4>
              <p>Your details are verified. You can proceed with the checkout.</p>
            </div>
          </div>
        )}

        {/* Dynamic Order Summary */}
        {checkoutItems.length > 0 && (
          <div className="checkout-summary-section" style={{ marginBottom: "30px" }}>
            <h3 style={{ borderBottom: "2px solid var(--light-bg)", paddingBottom: "8px", marginBottom: "15px" }}>
              Order Summary ({checkoutItems.reduce((acc, item) => acc + item.quantity, 0)} Items)
            </h3>
            <div className="checkout-summary-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center",
                    background: "var(--light-bg)",
                    padding: "15px 20px",
                    borderRadius: "12px",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <img
                    src={item.banner}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <h4 style={{ margin: "0 0 5px 0", color: "var(--dark-color)", fontSize: "16px" }}>
                      {item.name}
                    </h4>
                    <p style={{ margin: 0, color: "var(--primary-color)", fontWeight: "bold", fontSize: "14px" }}>
                      ₹{item.price}
                    </p>
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "600" }}>
                    Qty: {item.quantity}
                  </div>
                </div>
              ))}
            </div>
            
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 20px",
                background: "var(--success-bg)",
                border: "1px solid var(--success-border)",
                borderRadius: "12px",
                marginTop: "15px",
                fontWeight: "bold",
                color: "var(--dark-color)",
              }}
            >
              <span>Total Checkout Amount:</span>
              <span style={{ color: "var(--primary-color)", fontSize: "18px" }}>
                ₹{isCartCheckout 
                  ? checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0) - 500 + 20 
                  : product ? product.price : 0}
              </span>
            </div>
          </div>
        )}

        {/* Saved Addresses Selector */}
        {savedAddress && (
          <div className="saved-addresses-selector">
            <h3>Select a Saved Address</h3>
            <div className="checkout-address-cards">
              <div
                className={`checkout-addr-card ${isSavedAddressActive() ? "active-card" : ""}`}
                onClick={handleSelectSavedAddress}
              >
                <div className="card-header-row">
                  <span className="label-badge">Home / Default</span>
                  <FaMapMarkerAlt style={{ color: "var(--primary-color)" }} />
                </div>
                <strong>{savedAddress.name}</strong>
                <p className="card-phone">📞 {savedAddress.phone}</p>
                <p className="card-address-text">
                  {savedAddress.address}, {savedAddress.city}, {savedAddress.state} - {savedAddress.pincode}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Form Container */}
        <div className="shipping-form-container">
          <h3>Shipping Address</h3>
          <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
            <div className="checkout-input-field">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="checkout-input-field">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="checkout-input-field">
              <label>Address</label>
              <textarea
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>

            <div className="checkout-input-grid">
              <div className="checkout-input-field">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="checkout-input-field">
                <label>State</label>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            <div className="checkout-input-field">
              <label>Pincode</label>
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <button type="button" className="continue-btn" onClick={handleContinueToPayment}>
              Continue to Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
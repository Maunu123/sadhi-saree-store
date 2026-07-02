import React from "react";
import "./Cart.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const navigate = useNavigate();

  return (
    
  <div className="cart-page">
    <h1>Shopping Cart</h1>

    <div className="cart-container">

      {/* Left Side */}
      <div className="cart-items">

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

                  <button onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>

                </div>

                <div className="cart-buttons">

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                  <button
                    className="buy-btn"
                    onClick={() => navigate(`/checkout/${item.id}`)}
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

      {/* Right Side */}

      <div className="price-details">

        <h3>Price Details</h3>

        <div className="price-row">
          <span>Price ({cart.length} Items)</span>
          <span>₹{total}</span>
        </div>

        <div className="price-row">
          <span>Discount</span>
          <span className="green">-₹500</span>
        </div>

        <div className="price-row">
          <span>Platform Fee</span>
          <span>₹20</span>
        </div>

        <div className="price-row">
          <span>Delivery Charges</span>
          <span className="green">FREE</span>
        </div>

        <hr />

        <div className="price-total">
          <strong>Total Amount</strong>
          <strong>₹{total - 500 + 20}</strong>
        </div>

        <button
          className="place-order-btn"
          onClick={() => navigate("/checkout")}
        >
          Place Order
        </button>

      </div>

    </div>
  </div>
);
  
}
export default Cart;

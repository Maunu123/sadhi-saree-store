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

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.banner} alt={item.name} />

          <div>
            <h3>{item.name}</h3>

            <p>₹{item.price}</p>

            <button onClick={() => decreaseQuantity(item.id)}>-</button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQuantity(item.id)}>+</button>

            <button onClick={() => removeFromCart(item.id)}>Remove</button>

            <button
              className="buy-btn"
              onClick={() => navigate(`/checkout/${item.id}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>
    </div>
  );
}
export default Cart;

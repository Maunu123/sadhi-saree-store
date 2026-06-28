import React,{useContext} from "react";
import './Wishlist.css';
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Wishlist() {
const {
    wishlist,
    removeFromWishlist,
    moveWishlistToCart,
  } = useContext(CartContext);

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>

      {wishlist.length === 0 ? (
        <h2>Your Wishlist is Empty ❤️</h2>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="wishlist-item">
            <Link to={`/details/${item.id}`}>
              <img
                src={item.banner}
                alt={item.name}
              />
            </Link>

            <div className="wishlist-info">
              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <button
                className="cart-btn"
                onClick={() =>
                  moveWishlistToCart(item)
                }
              >
                Add To Cart
              </button>

              <button
                className="remove-btn"
                onClick={() =>
                  removeFromWishlist(item.id)
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
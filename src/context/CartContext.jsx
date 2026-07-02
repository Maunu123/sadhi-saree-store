import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // Wishlist State
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // =======================
  // Add To Cart
  // =======================
  const addToCart = (product) => {
    const updatedCart = [...cart];

    const existingItem = updatedCart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
      });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Added to Cart 🛒");
  };

  // =======================
  // Add To Wishlist
  // =======================
  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if (exists) {
      alert("Already in Wishlist ❤️");
      return;
    }

    const updatedWishlist = [...wishlist, product];

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    alert("Added to Wishlist ❤️");
  };

  // =======================
  // Remove From Wishlist
  // =======================
  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.id !== id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  // =======================
  // Move Wishlist To Cart
  // =======================
  const moveWishlistToCart = (product) => {
    const updatedCart = [...cart];

    const existingItem = updatedCart.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({
        ...product,
        quantity: 1,
      });
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    const updatedWishlist = wishlist.filter(
      (item) => item.id !== product.id
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    alert("Moved to Cart 🛒");
  };

  // =======================
  // Increase Quantity
  // =======================
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =======================
  // Decrease Quantity
  // =======================
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =======================
  // Remove From Cart
  // =======================
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // =======================
  // Clear Cart
  // =======================
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // =======================
  // Counts
  // =======================
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  // =======================
  // Provider
  // =======================
  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,

        addToCart,
        addToWishlist,

        removeFromCart,
        removeFromWishlist,
        clearCart,

        increaseQuantity,
        decreaseQuantity,

        moveWishlistToCart,

        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
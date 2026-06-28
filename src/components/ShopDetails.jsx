import React, { useState } from "react";
import "./ShopDetails.css";
import { useParams } from "react-router-dom";
import { productList } from "../util/helper";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Details = () => {
  const { id } = useParams();

  const product = productList.find((item) => item.id === Number(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const [rating, setRating] = useState(product.rating);

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const alreadyExists = wishlist.some((item) => item.id === product.id);

    if (!alreadyExists) {
      wishlist.push(product);

      localStorage.setItem("wishlist", JSON.stringify(wishlist));

      alert("Added to Wishlist ❤️");
    } else {
      alert("Already in Wishlist");
    }
  };

  


  const { addToCart } = useContext(CartContext);

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

          <p className="price">{product.price}</p>

          <p className="category">{product.category}</p>

          <p className="description">{product.description}</p>

          <p className="brand">
            <strong>Brand:</strong> {product.brand}
          </p>

          <p className="color">
            <strong>Color:</strong> {product.color}
          </p>

          <p className="fabric">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          <p className="rating">
            <strong>Rating:</strong> ⭐ {rating}
          </p>
          <div className="rate-product">
            <h4>Rate this Product</h4>

            <span onClick={() => setRating(1)}>⭐</span>
            <span onClick={() => setRating(2)}>⭐</span>
            <span onClick={() => setRating(3)}>⭐</span>
            <span onClick={() => setRating(4)}>⭐</span>
            <span onClick={() => setRating(5)}>⭐</span>
          </div>

          <p className="reviews">
            <strong>Reviews:</strong> {product.reviews}
          </p>
          <div className="action-buttons">
            <button className="cart-btn" onClick={() => addToCart(product)}>
              Add To Cart
            </button>

            <button className="wishlist-btn" onClick={addToWishlist}>
              ♡ Wishlist
            </button>
          </div>
        </div>
      </div>
    </>
  );
};


export default Details;

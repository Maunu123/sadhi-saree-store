import React from "react";
import "./Banner.css";
import banner from "../assets/banner-saree.png";

function Banner() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="tagline">TIMELESS ELEGANCE</p>

          <h1>
            Grace in every <br />
            <span>drape</span>
          </h1>

          <p className="hero-text">
            Explore our handcrafted saree collection <br />
            made for every beautiful you.
          </p>

          <button className="shop-btn">Shop Now →</button>
        </div>

        <div className="hero-image">
          <img src={banner} alt="saree model" />
        </div>
      </section>

      <section className="features">
        <div className="feature-box">
          <span>🚚</span>
          <div>
            <h4>Free Shipping</h4>
            <p>On orders above ₹999</p>
          </div>
        </div>

        <div className="feature-box">
          <span>🔄</span>
          <div>
            <h4>Easy Returns</h4>
            <p>7 days return policy</p>
          </div>
        </div>

        <div className="feature-box">
          <span>🛡️</span>
          <div>
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>

        <div className="feature-box">
          <span>🎧</span>
          <div>
            <h4>Support 24/7</h4>
            <p>We're here to help</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;

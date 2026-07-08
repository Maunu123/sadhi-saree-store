import React from "react";
import "./Banner.css";
import banner from "../assets/banner-saree.png";

function Banner() {
  const features = [
    { icon: "🚚", title: "Free Shipping", desc: "On orders above ₹999", key: "shipping" },
    { icon: "🔄", title: "Easy Returns", desc: "15 days return policy", key: "returns" },
    { icon: "🛡️", title: "Secure Payment", desc: "100% secure checkout", key: "security" },
    { icon: "🎧", title: "Support 24/7", desc: "Here to help anytime", key: "support" },
    { icon: "🎗️", title: "Authentic Saree", desc: "100% pure handloom", key: "authentic" },
    { icon: "💸", title: "Cash On Delivery", desc: "Available across India", key: "cod" },
  ];

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
        <div className="features-wrapper">
          <div className="features-content">
            {[...features].map((feat, index) => (
              <div className="feature-box" key={`${feat.key}-${index}`}>
                <span>{feat.icon}</span>
                <div>
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;

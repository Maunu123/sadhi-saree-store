import { useState, useContext } from "react";
import "./Home.css";
import { FiArrowRight } from "react-icons/fi";
import { productList } from "../util/helper";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

import saree from "../assets/saree.jpg";
import saree1 from "../assets/saree1.jpg";
import saree2 from "../assets/saree2.jpg";
import saree3 from "../assets/saree3.webp";
import saree4 from "../assets/saree4.jpg";
import saree5 from "../assets/saree5.webp";

const categories = [
  { name: "Silk Sarees", img: saree },
  { name: "Cotton Sarees", img: saree1 },
  { name: "Wedding Sarees", img: saree2 },
  { name: "Designer Sarees", img: saree3 },
  { name: "Festive Sarees", img: saree4 },
  { name: "Banarasi Sarees", img: saree5 },
];

function Home() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(CartContext);

  const filteredProducts = selectedCategory
    ? productList.filter(
        (item) => item.category === selectedCategory
      )
    : productList;

  return (
    <main className="home">

      {/* Shop By Category */}

      <section className="category-section">

        <div className="section-header">
          <h2>Shop by Category</h2>

          <a href="#" className="view-all">
            View All <FiArrowRight />
          </a>
        </div>

        <div className="category-list">
          {categories.map((item) => (
            <div
              className="category-card"
              key={item.name}
              onClick={() => setSelectedCategory(item.name)}
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </div>
          ))}
        </div>

      </section>

      {/* New Arrivals */}

      <section className="arrival-section">

        <div className="section-header">
          <h2>
            {selectedCategory
              ? selectedCategory
              : "New Arrivals"}
          </h2>

          <a href="#" className="view-all">
            View All <FiArrowRight />
          </a>
        </div>

        <div className="arrival-grid">

          {filteredProducts.map((item) => (

            <div
              className="arrival-card"
              key={item.id}
              onClick={() =>
                navigate(`/shop-details/${item.id}`)
              }
            >

              {item.tag && (
                <span className="badge">
                  {item.tag}
                </span>
              )}

              {/* Wishlist */}

              <button
                className="heart"
                onClick={(e) => {
                  e.stopPropagation();

                  const exists = wishlist.some(
                    (wish) => wish.id === item.id
                  );

                  if (exists) {
                    removeFromWishlist(item.id);
                  } else {
                    addToWishlist(item);
                  }
                }}
              >
                {wishlist.some(
                  (wish) => wish.id === item.id
                )
                  ? "❤️"
                  : "🤍"}
              </button>

              <img
                src={item.banner}
                alt={item.name}
              />

              <div className="product-info">
                <h4>{item.name}</h4>
                <p className="price">
                  ₹{item.price}
                </p>
              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;
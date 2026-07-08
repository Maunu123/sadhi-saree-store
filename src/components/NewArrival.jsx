import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiSliders, FiX } from "react-icons/fi";
import { productList } from "../util/helper";
import { CartContext } from "../context/CartContext";
import "./NewArrival.css";

function NewArrival() {
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [selectedFabric, setSelectedFabric] = useState("All");
  const [maxPrice, setMaxPrice] = useState(8000);
  const [sortBy, setSortBy] = useState("new");

  const newProducts = productList.filter((item) => item.tag === "new");
  const categories = ["All", ...new Set(newProducts.map((item) => item.category))];
  const colors = ["All", ...new Set(newProducts.map((item) => item.color))];
  const fabrics = [
    "All",
    ...new Set(newProducts.map((item) => item.fabricCategory)),
  ];

  const filteredNewProducts = useMemo(() => {
    return newProducts
      .filter((item) => selectedCategory === "All" || item.category === selectedCategory)
      .filter((item) => selectedColor === "All" || item.color === selectedColor)
      .filter((item) => selectedFabric === "All" || item.fabricCategory === selectedFabric)
      .filter((item) => item.price <= maxPrice)
      .sort((a, b) => {
        if (sortBy === "low") return a.price - b.price;
        if (sortBy === "high") return b.price - a.price;
        return b.id - a.id;
      });
  }, [maxPrice, newProducts, selectedCategory, selectedColor, selectedFabric, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedColor("All");
    setSelectedFabric("All");
    setMaxPrice(8000);
    setSortBy("new");
  };

  return (
    <main className="new-arrival-page">
      <section className="new-arrival-hero">
        <div>
          <span className="new-arrival-kicker">Fresh drops</span>
          <h1>New Arrivals</h1>
          <p>Handpicked sarees with premium textures, festive colors, and fresh styles.</p>
        </div>

        <div className="new-arrival-meta">
          <span>{filteredNewProducts.length} styles</span>
          <button type="button" onClick={clearFilters}>
            <FiSliders />
            Reset
          </button>
        </div>
      </section>

      <div className="new-arrival-layout">
        <aside className="new-filter-panel">
          <div className="new-filter-top">
            <div>
              <span className="new-filter-title">Filters</span>
              <p>Refine fresh arrivals</p>
            </div>
            <button type="button" onClick={clearFilters}>
              <FiX />
              Clear
            </button>
          </div>

          <div className="new-filter-group">
            <span>Category</span>
            <div className="new-filter-stack">
              {categories.map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="new-category"
                    checked={selectedCategory === item}
                    onChange={() => setSelectedCategory(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="new-filter-group">
            <span>Price</span>
            <input
              type="range"
              min="1500"
              max="8000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="new-filter-range">
              <span>&#8377;1500</span>
              <strong>Under &#8377;{maxPrice}</strong>
              <span>&#8377;8000</span>
            </div>
          </div>

          <div className="new-filter-group">
            <span>Color</span>
            <div className="new-color-swatches">
              {colors.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={selectedColor === item ? "active" : ""}
                  style={item === "All" ? undefined : { background: item }}
                  onClick={() => setSelectedColor(item)}
                >
                  {item === "All" ? "All" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="new-filter-group">
            <span>Fabric</span>
            <div className="new-filter-stack">
              {fabrics.map((item) => (
                <label key={item}>
                  <input
                    type="radio"
                    name="new-fabric"
                    checked={selectedFabric === item}
                    onChange={() => setSelectedFabric(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

        </aside>

        <section className="new-arrival-results">
          <div className="new-results-bar">
            <div>
              <strong>{filteredNewProducts.length}</strong>
              <span> fresh styles found</span>
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="new">Newest first</option>
              <option value="low">Price low to high</option>
              <option value="high">Price high to low</option>
            </select>
          </div>

          <div className="new-products">
            {filteredNewProducts.map((item) => {
              const inWishlist = wishlist.some((wish) => wish.id === item.id);

              return (
                <Link
                  key={item.id}
                  to={`/shop-details/${item.id}`}
                  className="new-product-link"
                >
                  <article className="new-product-card">
                    <div className="new-product-media">
                      <span className="new-product-badge">NEW</span>

                      <button
                        type="button"
                        className={`new-wishlist-btn ${inWishlist ? "active" : ""}`}
                        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                        onClick={(e) => {
                          e.preventDefault();

                          if (inWishlist) {
                            removeFromWishlist(item.id);
                          } else {
                            addToWishlist(item);
                          }
                        }}
                      >
                        <FiHeart />
                      </button>

                      <img src={item.banner} alt={item.name} />
                    </div>

                    <div className="new-product-info">
                      <span className="new-product-category">{item.category}</span>
                      <h3>{item.name}</h3>

                      <div className="new-product-price">
                        <strong>&#8377;{item.price}</strong>
                        {item.originalPrice && <span>&#8377;{item.originalPrice}</span>}
                        {item.discount && <small>{item.discount}</small>}
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>

          {filteredNewProducts.length === 0 && (
            <div className="new-empty-state">
              <h3>No fresh arrivals found</h3>
              <p>Try clearing filters or increasing your price range.</p>
              <button type="button" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default NewArrival;

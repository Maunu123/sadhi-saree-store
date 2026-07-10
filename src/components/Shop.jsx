import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHeart, FiX } from "react-icons/fi";
import "./Shop.css";
import { productList } from "../util/helper.js";
import { CartContext } from "../context/CartContext";

function Shop() {
  const location = useLocation();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(CartContext);

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const [category, setCategory] = useState([]);
  const [fabric, setFabric] = useState([]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 8;
  const categories = [
    "Silk Sarees",
    "Cotton Sarees",
    "Wedding Sarees",
    "Designer Sarees",
    "Festive Sarees",
    "Banarasi Sarees",
  ];
  const fabrics = ["silk", "cotton", "Georgette", "Chiffon"];
  const colors = ["red", "blue", "pink", "yellow", "purple", "orange", "green"];

  function handleCategory(value) {
    setCurrentPage(1);
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  }

  function handleFabric(value) {
    setCurrentPage(1);
    setFabric((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  }

  function handleClear() {
    setCategory([]);
    setFabric([]);
    setColor("");
    setPrice(0);
    setSortBy("");
    setCurrentPage(1);
  }

  const filteredProducts = productList
    .filter((item) => {
      const categoryMatch =
        category.length === 0 || category.includes(item.category);
      const fabricMatch =
        fabric.length === 0 || fabric.includes(item.fabricCategory);
      const colorMatch = color === "" || color === item.color;
      const priceMatch = price === 0 || item.price <= price;
      const newMatch = sortBy !== "new" || item.tag === "new";
      const searchMatch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return (
        categoryMatch &&
        fabricMatch &&
        colorMatch &&
        priceMatch &&
        newMatch &&
        searchMatch
      );
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") return a.price - b.price;
      if (sortBy === "highToLow") return b.price - a.price;
      if (sortBy === "new") return (b.tag === "new") - (a.tag === "new");
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  return (
    <main className="shop-page">
      <section className="shop-header">
        <div>
          <span className="shop-kicker">Curated saree edit</span>
          <h1>Shop The Collection</h1>
          <p>
            Showing {filteredProducts.length} products
            {search && <strong> for "{search}"</strong>}
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) => {
            setCurrentPage(1);
            setSortBy(e.target.value);
          }}
        >
          <option value="">Recommended</option>
          <option value="new">Newest first</option>
          <option value="lowToHigh">Price Low to High</option>
          <option value="highToLow">Price High to Low</option>
        </select>
      </section>

      <div className="shop-layout">
        <aside className="filters">
          <h3>
            Filters
            <button type="button" onClick={handleClear}>
              <FiX />
              Clear
            </button>
          </h3>

          <h4>Categories</h4>
          {categories.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={category.includes(item)}
                onChange={() => handleCategory(item)}
              />
              {item}
            </label>
          ))}

          <div className="price-filter">
            <h4>Price</h4>
            <input
              type="range"
              min="0"
              max="10000"
              step="500"
              value={price}
              onChange={(e) => {
                setCurrentPage(1);
                setPrice(Number(e.target.value));
              }}
              className="range"
            />

            <div className="range-values">
              <span>&#8377;0</span>
              <span>{price === 0 ? "Any" : `\u20b9${price}`}</span>
              <span>&#8377;10000</span>
            </div>
          </div>

          <h4>Color</h4>
          <div className="colors">
            {colors.map((item) => (
              <button
                type="button"
                key={item}
                className={color === item ? "active" : ""}
                style={{ background: item }}
                aria-label={`Filter ${item} sarees`}
                onClick={() => {
                  setCurrentPage(1);
                  setColor(color === item ? "" : item);
                }}
              />
            ))}
          </div>

          <h4>Fabric</h4>
          {fabrics.map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={fabric.includes(item)}
                onChange={() => handleFabric(item)}
              />
              {item}
            </label>
          ))}
        </aside>

        <section className="products">
          {currentProducts.map((p) => {
            const inWishlist = wishlist.some((item) => item.id === p.id);

            return (
              <Link
                key={p.id}
                to={`/shop-details/${p.id}`}
                className="shop-product-link"
              >
                <article className="shop-product-card">
                  <div className="shop-product-media">
                    {p.tag && <span className="shop-badge">{p.tag}</span>}
                    {p.discount && (
                      <span className="shop-discount">{p.discount}</span>
                    )}

                    <button
                      type="button"
                      className={`shop-heart ${inWishlist ? "active" : ""}`}
                      aria-label={
                        inWishlist ? "Remove from wishlist" : "Add to wishlist"
                      }
                      onClick={(e) => {
                        e.preventDefault();

                        if (inWishlist) {
                          removeFromWishlist(p.id);
                        } else {
                          addToWishlist(p);
                        }
                      }}
                    >
                      <FiHeart />
                    </button>

                    <img src={p.banner} alt={p.name} />
                  </div>

                  <div className="shop-card-body">
                    <span>{p.category}</span>
                    <h3>{p.name}</h3>

                    <div className="shop-card-price">
                      <strong>&#8377;{p.price}</strong>
                      {p.originalPrice && <small>&#8377;{p.originalPrice}</small>}
                    </div>
                  </div>

                  <div className="shop-card-footer">
                    <span>{p.fabric}</span>
                    <span>{p.rating} rating</span>
                  </div>
                </article>
              </Link>
            );
          })}

          {currentProducts.length === 0 && (
            <div className="shop-empty-state">
              <h3>No sarees found</h3>
              <p>Try clearing filters or searching for another collection.</p>
              <button type="button" onClick={handleClear}>
                Clear filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Shop;

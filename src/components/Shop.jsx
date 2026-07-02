import "./Shop.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { productList } from "../util/helper.js";

function Shop() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search") || "";

  const [category, setCategory] = useState([]);
  const [fabric, setFabric] = useState([]);
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 7;

  function handleCategory(value) {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }

  function handleFabric(value) {
    setFabric((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  }

  function handleColor(value) {
    setColor(value);
  }

  function handlePricechange(e) {
    setPrice(Number(e.target.value));
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  function handleClear() {
    setCategory([]);
    setFabric([]);
    setColor("");
    setPrice(0);
    setSortBy("");
  }

  const filteredProducts = productList
    .filter((item) => {
      const categoryMatch =
        category.length === 0 || category.includes(item.category);

      const fabricMatch =
        fabric.length === 0 || fabric.includes(item.fabricCategory);

      const colorMatch =
        color === "" || color === item.color;

      const priceMatch =
        price === 0 || item.price <= price;

      const newMatch =
        sortBy !== "new" || item.tag === "new";

      const searchMatch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase());

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
      if (sortBy === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortBy === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });

  const totalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="shop-page">
      <p className="breadcrumb">Home &gt; Shop</p>

      <div className="shop-header">
        <div>
          <h1>Shop</h1>
          <p>Showing {filteredProducts.length} products</p>
        </div>

        <select value={sortBy} onChange={handleSortBy}>
          <option value="">Select</option>
          <option value="new">Sort by Newest</option>
          <option value="lowToHigh">Price Low to High</option>
          <option value="highToLow">Price High to Low</option>
        </select>
      </div>

      <div className="shop-layout">
        <aside className="filters">
          <h3>
            Filters
            <span onClick={handleClear}>Clear all</span>
          </h3>

          <h4>Categories</h4>

          {[
            "Silk Sarees",
            "Cotton Sarees",
            "Wedding Sarees",
            "Designer Sarees",
            "Festive Sarees",
            "Banarasi Sarees",
          ].map((item) => (
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
              value={price}
              onChange={handlePricechange}
              className="range"
            />

            <div className="range-values">
              <span>₹0</span>
              <span>₹{price}</span>
              <span>₹10000</span>
            </div>
          </div>

          <h4>Color</h4>

          <div className="colors">
            <span
              style={{ background: "red" }}
              onClick={() => handleColor("red")}
            ></span>

            <span
              style={{ background: "blue" }}
              onClick={() => handleColor("blue")}
            ></span>

            <span
              style={{ background: "pink" }}
              onClick={() => handleColor("pink")}
            ></span>

            <span
              style={{ background: "yellow" }}
              onClick={() => handleColor("yellow")}
            ></span>

            <span
              style={{ background: "purple" }}
              onClick={() => handleColor("purple")}
            ></span>

            <span
              style={{ background: "orange" }}
              onClick={() => handleColor("orange")}
            ></span>

            <span
              style={{ background: "green" }}
              onClick={() => handleColor("green")}
            ></span>
          </div>

          <h4>Fabric</h4>

          {["silk", "cotton", "Georgette", "Chiffon"].map((item) => (
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

        <main className="products">
          {currentProducts.map((p) => (
            <Link
              key={p.id}
              to={`/shop-details/${p.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div className="card">
                <div className="img-box">
                  {p.tag && (
                    <span className="badge">
                      {p.tag}
                    </span>
                  )}

                  <button
                    className="heart"
                    onClick={(e) => e.preventDefault()}
                  >
                    ♡
                  </button>

                  <img
                    src={p.banner}
                    alt={p.name}
                  />
                </div>

                <h3>{p.name}</h3>

                <p>{p.category}</p>

                <h4>₹{p.price}</h4>
              </div>
            </Link>
          ))}

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={
                  currentPage === index + 1
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(index + 1)
                }
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              &gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Shop;
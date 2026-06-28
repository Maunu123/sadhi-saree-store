import React from "react";
import { Link } from "react-router-dom";
import { productList } from "../util/helper";
import "./NewArrival.css";

function NewArrival() {
  const newProducts = productList.filter(
    (item) => item.tag === "new"
  );

  return (
    <div className="new-arrival-page">
      <h1>New Arrivals</h1>

      <div className="new-products">
        {newProducts.map((item) => (
          <Link
            key={item.id}
            to={`/shop-details/${item.id}`}
            className="product-link"
          >
            <div className="card">
              <div className="img-box">
                <span className="badge">NEW</span>
                <img src={item.banner} alt={item.name} />
              </div>

              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <h4>₹{item.price}</h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewArrival;
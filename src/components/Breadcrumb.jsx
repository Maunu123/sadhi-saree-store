import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  const { pathname } = useLocation();

  // Hide breadcrumb on Home page
  if (pathname === "/") return null;

  // Product Details page
  if (pathname.startsWith("/shop-details/")) {
    return (
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>

        <Link to="/shop">Shop</Link>
        <span> / </span>

        <span className="active">Product Details</span>
      </div>
    );
  }

  // Other pages
  const pageName = pathname
    .replace("/", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      <span> / </span>

      <span className="active">{pageName}</span>
    </div>
  );
};

export default Breadcrumb;

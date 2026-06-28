import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import ShopDetails from "./components/ShopDetails";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import { useState } from "react";
import Checkout from "./components/Checkout";
import NewArrival from "./components/NewArrival";
import User from "./components/User";


function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Home />
            </>
          }
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop-details/:id" element={<ShopDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/new-arrival" element={<NewArrival />} />
        <Route path="/user" element={<User />} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

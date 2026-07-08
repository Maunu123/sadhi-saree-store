import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
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
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./components/Payment";
import OrderSuccess from "./components/OrderSuccess";
import MyOrders from "./components/MyOrders";

function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <BrowserRouter>
      <AnnouncementBar />
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
        
        
        <Route path="/new-arrival" element={<NewArrival />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

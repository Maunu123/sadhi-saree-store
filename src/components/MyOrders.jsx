import React from "react";
import "./MyOrders.css";

function MyOrders() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const myOrders = currentUser
    ? orders.filter((order) => order.userId === currentUser.id)
    : [];

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {myOrders.length === 0 ? (
        <h3>No Orders Yet</h3>
      ) : (
        myOrders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID : {order.id}</h3>
            <p>Date : {order.date}</p>
            <p>Status : {order.status}</p>
            <p>Payment : {order.paymentMethod}</p>
            <h4>Total : Rs.{order.total}</h4>

            <hr />

            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.banner} alt={item.name} />

                <div className="order-details">
                  <h4>{item.name}</h4>
                  <p>Rs.{item.price}</p>
                  <p>Qty : {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;

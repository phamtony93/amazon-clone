import React, { useState, useEffect } from "react";
import "./Orders.css";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Order from "../Order/Order.js";

function Orders() {
  // use local state here instead of context api
  // we don't need to know the state anywhere else in the application
  const [orders, setOrders] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  // on render, get orders from firebase
  useEffect(() => {
    // only query against firebase if user is not null
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      setOrders(orders);
    } else {
      // else set orders to empty array
      setOrders([]);
    }
    // if useEffect depends on an outside variable, we need to set useEffect dependent on that variable
  }, [user]);

  console.log("orders are >>>>", orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

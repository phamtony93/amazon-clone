import React from "react";
import "./Payment.css";
import { useStateValue } from "../../StateProvider";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { Link } from "react-router-dom";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link>{basket?.length} Items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            {user?.email}
            <p>123 Pastoral Loop</p>
            <p>San Jose CA, 95110</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Your Items</h3>
          </div>
          <div className="payment__items">
            {basket?.map((item) => (
              <CheckoutProduct
                image={item.image}
                rating={item.rating}
                price={item.price}
                title={item.title}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__method">{/* stripe magic */}</div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

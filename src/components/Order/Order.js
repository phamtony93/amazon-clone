import React from "react";
import "./Order.css";
import moment, { unix } from "moment";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">{order.id}</p>
      {order.data.basket?.map((item) => {
        return (
          <CheckoutProduct
            image={item.image}
            price={item.price}
            rating={item.rating}
            title={item.title}
            hideButton={true}
          />
        );
      })}
      <div className="order__total">
        <CurrencyFormat
          renderText={(value) => (
            <p>
              <strong>Total {value}</strong>
            </p>
          )}
          decimalScale={2}
          value={order.data.amount / 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </div>
    </div>
  );
}

export default Order;

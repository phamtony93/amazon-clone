import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../StateProvider";
import { getBasketTotal } from "../../reducer";
import { Link } from "react-router-dom";

function Subtotal() {
  let [{ basket }, dispatch] = useStateValue();

  console.log(basket);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket?.length} items):
              <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <Link to="/payment">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
}

export default Subtotal;

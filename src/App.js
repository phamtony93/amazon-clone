import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//test key from Stripe
const promise = loadStripe(
  "pk_test_51HRtvKL0MubunR6nOpOJU3tgVMP2kNGQDJRG3lMmR38iBEkkFjELinxpK6nsXvAEeViPhBo4N9BoFz0T4MQHMrmX002C9WucMh"
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    // use BEM naming ocnvnetion
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <ProtectedRoute path="/payment">
            {/* Payment component is wrapped in a HOC Elements */}
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </ProtectedRoute>
          <ProtectedRoute path="/checkout">
            <Checkout />
          </ProtectedRoute>
          <ProtectedRoute path="/orders">
            <Orders />
          </ProtectedRoute>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

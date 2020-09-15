import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  // can these variables be declared as const??
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const signIn = (event) => {
    event.preventDefault();
  };

  const registerUser = (event) => {
    event.preventDefault();
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      {/* create container for the input square */}
      <div className="login__input">
        <h1>Sign-In</h1>
        <form>
          <h5>Email</h5>
          <input type="text" value={email} onChange={handleEmail}></input>
          <h5>Password </h5>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
          ></input>
          <button
            type="submit"
            className="login__signinButton"
            onClick={signIn}
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the Amazon clone Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          className="login__registerButton"
          onClick={registerUser}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}

export default Login;

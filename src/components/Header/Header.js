import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";

const LOGO = "http://pngimg.com/uploads/amazon/amazon_PNG11.png";

function Header() {
  const history = useHistory();
  let [{ basket, user }, dispatch] = useStateValue();

  const signOut = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="header__logo" src={LOGO} />
      </Link>
      <div className="header__search">
        <input className="header__searchInput" type="text"></input>
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        {/* only redirect to login user was null */}
        <Link to={!user && "/login"}>
          {/* make div clickable for signout functionality */}
          <div onClick={signOut} className="header__navOption">
            <span className="header__navOptionLineOne">
              Hello {user ? user.email : "Guest"}
            </span>
            <span className="header__navOptionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header__navOption">
            <span className="header__navOptionLineOne">Returns</span>
            <span className="header__navOptionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header__navOption">
          <span className="header__navOptionLineOne">Your</span>
          <span className="header__navOptionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header__navOptionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {/* use optional chaining instead of ternary operators!! These are much cleaner */}
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

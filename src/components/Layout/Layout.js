import React from "react";
import { useStore, useDispatch } from 'react-redux'
import { cartActions } from "../../store/shopping-cart/cartSlice";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.jsx";
import "./styles.css";


import { useSelector } from "react-redux";
import { useState } from "react";

const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  const store = useStore();
  let shouldNotify;
  let notificationMessage;
  store.subscribe(handleChange);
  const [shouldNotifyUser, setShouldNotifyUser] = useState(false);
  const [cartNotificationMessage, setCartNotificationMessage] = useState(false);
  const dispatch = useDispatch();

  
  function handleChange() {
      shouldNotify = store.getState().cart.shouldNotifyUser;
      notificationMessage = store.getState().cart.notificationMessage;
      if(shouldNotify) {
        setCartNotificationMessage(notificationMessage);
        setShouldNotifyUser(true);
        setTimeout(() => {
          setShouldNotifyUser(false);
          dispatch(cartActions.cancelNotification())
        }, 2000)
      }
    }

  return (
    <div className="d-flex flex-column vh-100 justify-content-between">
      <Header />
      {shouldNotifyUser && (
          <div className="updateCartNotifiation">
            <span>{cartNotificationMessage}</span>
          </div>
      )}
      {showCart && <Carts />}
      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

import React from "react";
import classes from "../Styles/Header.module.css";
import { useContext } from "react";
import { AppContext } from "../App";
import { auth } from "../firebase";
import logo from "../download.jpg"

const Header = () => {
  const logoutFunc = () => auth.signOut();
  const { user, setSignUpModalIsOpen, setSignInModalIsOpen } = useContext(AppContext);
  return (
    <div className={classes.header}>
     <img src={logo}/>
      {user ? (
        <div onClick={logoutFunc} className={classes.logs__wrapper}>
          <p >LOGOUT</p>
        </div>
      ) : (
        <div className={classes.logs__wrapper}>
          <p onClick={()=> setSignInModalIsOpen(true)}>SIGN IN</p>
          <p onClick={()=> setSignUpModalIsOpen(true)}>SIGN UP</p>
        </div>
      )}
    </div>
  );
};

export default Header;

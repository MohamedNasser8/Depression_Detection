import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"
import logo from "../../assets/logo.svg";

function Header() {
  

  return (
    <section className="top-nav">
      <a href="/home">
        <img className="logo" src={logo} alt="DepFigh-logo" />
      </a>
      <input id="menu-toggle" type="checkbox" />
      <label className="menu-button-container" htmlFor="menu-toggle">
        <div className="menu-button"></div>
      </label>
      <ul className="menu">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </section>
  );
}

export default Header;
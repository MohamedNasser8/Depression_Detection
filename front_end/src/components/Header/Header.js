import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Header.css"
import logo from "../../assets/logo.png";

function Header() {
    function logout(){
        localStorage.removeItem("pirates-token");
    }

    return (
        <section className="top-nav">
            <img className = "logo" src={logo} href = "home" alt="Pirates-logo"/>
            <input id="menu-toggle" type="checkbox" />
            <label className='menu-button-container' htmlFor="menu-toggle">
                <div className='menu-button'></div>
            </label>
            <ul className="menu">
                <li href="/">Home</li>
                <li href="/about">About</li>
            </ul>
        </section>
    );
}

export default Header;
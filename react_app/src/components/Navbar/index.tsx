import logo from "../../images/BEYOND-DOCS.png";
import "./style.scss";
import CallToAction from "../common/CallToAction";
import React from "react";
import { scrollToSection } from "../utils/helper";

function Navbar() {
  return (
    <div className="top-navigation-bar">
      <div className="app-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navigation">
        <span
          className="navigation-item"
          onClick={() => scrollToSection("home")}
        >
          Home
        </span>
        <span
          className="navigation-item"
          onClick={() => scrollToSection("about")}
        >
          About BDocs
        </span>
        <span
          className="navigation-item"
          onClick={() => scrollToSection("contactus")}
        >
          Contact Us
        </span>
        <CallToAction text="Login" />
      </div>
    </div>
  );
}

export default Navbar;

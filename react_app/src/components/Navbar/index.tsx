import React, { useEffect, useState } from "react";
import { scrollToSection } from "../utils/helper";
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from "../utils/context";
import CallToAction from "../common/calltoaction";
import logo from "../../images/BEYOND-DOCS.png";
import { Link } from "react-router-dom";
import "./style.scss";
function Navbar() {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`top-navigation-bar ${scrolled ? "sticky-navbar" : ""}`}>
      <div className="navigation-content">
        <div className="left-col">
          <div className="app-logo">
            <Link to="/" className="cta-link">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="right-col">
          <div className="navigation">
            {isLoggedIn ? (
              <>
                <span className="navigation-item">Upload Document</span>
                <span className="navigation-item">Dashboard</span>
                <span className="navigation-item">Help</span>
                <div className="avatar-icon">
                  <BsPersonCircle />
                </div>
              </>
            ) : (
              <>
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
                  About
                </span>
                <span
                  className="navigation-item"
                  onClick={() => scrollToSection("contactus")}
                >
                  Contact
                </span>
                <Link to="/welcome" className="cta-link">
                  <CallToAction text="login" type="fill" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

//Navbar.tsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth-context";
import { scrollToSection } from "../utils/helper";
import Login from "../login";
import CallToAction from "../common/calltoaction";
import logo from "../../images/BEYOND-DOCS.png";
import { BsPersonCircle } from "react-icons/bs";
import "./style.scss";
import { checkConnection } from "../utils/auth-utils";

function Navbar() {
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

  const { isConnected, setIsConnected, setUserAddress, setLoading } = useAuth();

  useEffect(() => {
    console.log("Navbar useEffect called");
    checkConnection(setIsConnected, setUserAddress, setLoading);
  }, [checkConnection, setUserAddress, setLoading]);

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
            {isConnected ? (
              <>
                <Link to="/upload" className="navigation-item">
                  Upload Document
                </Link>

                <Link to="/dashboard" className="navigation-item">
                  Dashboard
                </Link>

                <Link to="/help" className="navigation-item">
                  Help
                </Link>

                <div className="avatar-icon">
                  <Link to="/welcome" className="avatar-icon">
                    <BsPersonCircle />
                  </Link>
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

                <Link to="/login" className="cta-link">
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

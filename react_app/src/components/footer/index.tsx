import "./style.scss";
import SocialIcon from "./social-icon";
import { FaYoutube, FaGithub } from "react-icons/fa6";
import Section from "../common/section";
import Logo from "../../images/BEYOND-DOCS.png";
import React, { ReactNode } from "react";
import { scrollToSection } from "../utils/helper";

function Footer() {
  return (
    <Section background="black-dark" className="footer">
      <div className="footer-content-wrapper">
        <div className="footer-logo">
          <img src={Logo} alt="logo"></img>
        </div>
        <ul className="footer-menu-items">
          <li
            className="footer-menu-item"
            onClick={() => scrollToSection("home")}
          >
            Home
          </li>
          <li
            className="footer-menu-item"
            onClick={() => scrollToSection("about")}
          >
            About BDocs
          </li>
          <li
            className="footer-menu-item"
            onClick={() => scrollToSection("contactus")}
          >
            Contact Us
          </li>
        </ul>
        <div className="social-icons">
          <SocialIcon
            color="#FF0000"
            icon={FaYoutube}
            link="https://www.youtube.com"
          />

          <SocialIcon
            icon={FaGithub}
            color="#0D2636"
            link="https://www.github.com"
          />
        </div>
        <div className="bottom-bar">
          <div className="copytight-text">
            Copyrights 2024 Beyond Docs | All Rights Reserved
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Footer;

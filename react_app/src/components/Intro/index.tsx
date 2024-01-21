import "./style.scss";
import "../../style-config/variable.scss";
import IntroContent from "./intro-content";
import React from "react";

function index() {
  return (
    <div id="home" className="Intro-section">
      <div className="vector-bg" id="parallax"></div>

      <div className="content">
        <IntroContent />
      </div>
    </div>
  );
}

export default index;

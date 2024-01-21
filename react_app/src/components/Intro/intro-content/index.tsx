import "./style.scss";

import CallToAction from "../../common/CallToAction";
import { FaArrowTurnDown } from "react-icons/fa6";
import TransparentBox from "../../common/transparent-box";
import { BsAwardFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import React from "react";

function IntroContent() {
  return (
    <div className="intro-content">
      <div className="layout">
        <div className="left-col">
          <div className="phone"> </div>
          {/* <TransparentBox
            type="horizontal"
            text="Access Anytime Anywhere"
            icon={FaUser}
          />
          <TransparentBox
            type="vertical"
            text="Secure Storage For All Documents"
            icon={BsAwardFill}
          /> */}
        </div>

        <div className="right-col">
          <h1 className="title">
            <span className="small-text">
              <span className="text">Welcome To </span>
              <span className="icon">
                <FaArrowTurnDown />
              </span>
            </span>
            <span className="big-text">BEYOND DOCS</span>
          </h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore cum,
            provident totam libero reprehenderit omnis possimus recusandae
            maxime earum sint nam consequatur soluta? Laborum, doloremque
            deserunt. Velit sapiente ipsa inventore.
          </p>
          <CallToAction text="Login" />
        </div>
      </div>
    </div>
  );
}

export default IntroContent;

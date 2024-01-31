import React from "react";
import avatar from "./../../images/avatar_logo.png";
import "./style.scss";
import CallToAction from "../common/calltoaction";
import { BsPersonCircle } from "react-icons/bs";

interface WelcomeProps {
  user: string;
}
function Welcome(props: WelcomeProps) {
  const { user } = props;

  return (
    <>
      <div className="main-content">
        <div className="avatar">
          <BsPersonCircle />
        </div>
        <div className="title">Welcome To Beyond Docs {user} </div>
        <div className="ctas">
          <CallToAction text="Upload Document" type="fill" to="/upload" />
          <CallToAction text="Validate Document" type="border" to="/retrive" />
          <CallToAction text="View Dashboard" type="border" to="dashboard" />
        </div>
      </div>
    </>
  );
}

export default Welcome;

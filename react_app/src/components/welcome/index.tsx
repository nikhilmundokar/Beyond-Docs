// Welcome.tsx
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import CallToAction from "../common/calltoaction";

interface WelcomeProps {
  user: string;
  onDisconnect: () => void;
}

function Welcome(props: WelcomeProps) {
  const { user, onDisconnect } = props;
  const navigate = useNavigate();

  return (
    <>
      <div className="main-content">
        <div className="avatar">
          <BsPersonCircle />
        </div>
        <div className="title">Welcome To Beyond Docs</div>

        <div className="ctas">
          <CallToAction text="Upload Document" type="fill" to="/upload" />
          <CallToAction text="Validate Document" type="border" to="/retrive" />
          <CallToAction text="View Dashboard" type="border" to="dashboard" />
          <CallToAction
            text="Disconnect"
            action={() => {
              onDisconnect();
              navigate("/");
            }}
            type=""
          />
        </div>
      </div>
    </>
  );
}

export default Welcome;

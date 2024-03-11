import React, { useEffect } from "react";
import { BsPersonCircle } from "react-icons/bs";
import CallToAction from "../common/calltoaction";
import "./style.scss";
import { useAuth } from "../utils/auth-context";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { isConnected } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate("/login");
    }
  }, [isConnected, navigate]);

  return (
    <>
      <div className="main-content">
        <div className="avatar">
          <BsPersonCircle />
        </div>
        <div className="title">Welcome To Beyond Docs</div>

        <div className="ctas">
          <CallToAction text="Upload Document" type="border" to="/upload" />
          <CallToAction text="Validate Document" type="border" to="/retrive" />
          <CallToAction text="View Dashboard" type="border" to="dashboard" />
        </div>
      </div>
    </>
  );
}

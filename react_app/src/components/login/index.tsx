//login.tsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkConnection, handleConnect } from "../utils/auth-utils";
import Welcome from "../welcome";
import CallToAction from "../common/calltoaction";
import "./style.scss";

type LoginProps = {
  onAuthenticate: (address: string) => void;
};

const Login: React.FC<LoginProps> = ({ onAuthenticate }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginHandler = async () => {
    await handleConnect(
      setIsConnected,
      setUserAddress,
      onAuthenticate,
      navigate
    );
  };

  const handleConnectWrapper: React.MouseEventHandler<HTMLDivElement> = async (
    event
  ) => {
    await loginHandler();
  };
  useEffect(() => {
    checkConnection(setIsConnected, setUserAddress, setLoading);
  }, [setIsConnected, setUserAddress, setLoading]);

  const handleDownload = () => {
    window.open("https://metamask.io/download.html", "_blank");
  };

  return (
    <>
      <div className="login-container">
        <div className="main-content">
          {!loading ? (
            isConnected ? (
              <Welcome user={userAddress} />
            ) : (
              <>
                <div className="title">
                  <span>Login with MetaMask</span>
                </div>
                <p>Please connect with MetaMask to proceed.</p>
                <div className="ctas">
                  <CallToAction
                    text="Download MetaMask"
                    action={handleDownload}
                    type="border"
                  />
                  <CallToAction
                    text="Connect with MetaMask"
                    action={handleConnectWrapper}
                    type="fill"
                  />
                </div>
              </>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

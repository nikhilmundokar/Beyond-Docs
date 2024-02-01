// Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Welcome from "../welcome";
import CallToAction from "../common/calltoaction";
import "./style.scss";

interface LoginProps {
  onAuthenticate: (address: string) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticate }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
        } else {
          setIsConnected(false);
          setUserAddress(null);
        }
      } catch (error) {
        console.error("Error checking MetaMask connection:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
          onAuthenticate(accounts[0]);

          // Navigate to the "/welcome" route
          navigate("/welcome");
        } else {
          console.error("MetaMask connection failed.");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error.message);
      }
    } else {
      console.error(
        "MetaMask not found. Please install MetaMask or another Ethereum provider."
      );
    }
  };

  const handleDisconnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_logout" });
        setIsConnected(false);
        setUserAddress(null);
        navigate("/");
      } catch (error) {
        console.error("Error disconnecting from MetaMask:", error.message);
      }
    }
  };

  const handleDownload = async () => {
    window.open("https://metamask.io/download.html", "_blank");
  };

  return (
    <>
      <div className="login-container">
        <div className="main-content">
          {!loading ? (
            isConnected ? (
              <Welcome user={userAddress} onDisconnect={handleDisconnect} />
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
                    action={handleConnect}
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

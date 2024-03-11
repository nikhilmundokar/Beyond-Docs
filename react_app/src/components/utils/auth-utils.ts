//auth-utils.ts

import { NavigateFunction, useNavigate } from "react-router-dom";

export const checkConnection = async (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("checkConnection function called");
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
    } catch (error: any) {
      console.error("Error checking MetaMask connection:", error.message);
    } finally {
      setLoading(false);
    }
  }
};

export const handleConnect = async (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>,
  onAuthenticate: (address: string) => void,
  navigate: NavigateFunction
) => {
  console.log("handleConnect function called");
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
        navigate("/welcome");
      } else {
        console.error("MetaMask connection failed.");
      }
    } catch (error: any) {
      console.error("Error connecting to MetaMask:", error.message);
    }
  } else {
    console.error(
      "MetaMask not found. Please install MetaMask or another Ethereum provider."
    );
  }
};

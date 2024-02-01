// Login.tsx
import React, { useState, useEffect } from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react';

interface LoginProps {
  onAuthenticate: (address: string) => void;
}

const Login: React.FC<LoginProps> = ({ onAuthenticate }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
        } else {
          setIsConnected(false);
          setUserAddress(null);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error.message);
      }
    }
  };

  const handleConnect = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });

        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
          onAuthenticate(accounts[0]);
        } else {
          console.error('MetaMask connection failed.');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error.message);
      }
    } else {
      console.error('MetaMask not found. Please install MetaMask or another Ethereum provider.');
    }
  };

  const handleDisconnect = async () => {
    if (window.ethereum) {
      try {
        setIsConnected(false);
        setUserAddress(null);
      } catch (error) {
        console.error('Error disconnecting from MetaMask:', error.message);
      }
    }
  };

  return (
    <CContainer className="login-container">
      <CRow className="justify-content-center">
        <CCol md="6">
          <CCard>
            <CCardBody>
              <h1 className="text-center mb-4">Login with MetaMask</h1>
              {isConnected ? (
                <>
                  <p className="text-center">Connected User: {userAddress}</p>
                  <CButton color="danger" onClick={handleDisconnect}>
                    Disconnect
                  </CButton>
                </>
              ) : (
                <>
                  <p className="text-center">Please connect with MetaMask to proceed.</p>
                  <CButton color="primary" onClick={handleConnect}>
                    Connect with MetaMask
                  </CButton>
                </>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Login;

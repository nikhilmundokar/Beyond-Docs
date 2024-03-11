//auth-context.tsx

import React, { ReactNode, createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextValue = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  userAddress: string | null;
  setUserAddress: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const authContextValue: AuthContextValue = {
    isLoggedIn,
    login,
    logout,
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    loading,
    setLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

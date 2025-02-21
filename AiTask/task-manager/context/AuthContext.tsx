"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { fakeLogin, logout as doLogout } from "../lib/auth";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ email: "test@example.com" }); // Simulated user
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user } = fakeLogin(email, password);
      setUser(user);
    } catch (error) {
      alert("Login failed");
    }
  };

  const logout = () => {
    doLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

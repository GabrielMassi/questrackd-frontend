import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "./api";

interface AuthContextType {
  userToken: string | null;
  username: string | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
  userToken: null,
  username: null,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const [token, storedUsername] = await Promise.all([
          AsyncStorage.getItem("userToken"),
          AsyncStorage.getItem("username"),
        ]);
        if (token) {
          API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setUserToken(token);
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Failed to check login status", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await API.post("/auth/signin", { username, password });
      const token = response.data.access_token;

      await Promise.all([
        AsyncStorage.setItem("userToken", token),
        AsyncStorage.setItem("username", username),
      ]);

      const [storedToken, storedUser] = await Promise.all([
        AsyncStorage.getItem("userToken"),
        AsyncStorage.getItem("username"),
      ]);

      if (storedUser !== username) {
        throw new Error("Username storage failed");
      }

      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUserToken(token);
      console.log(username);

      return true;
    } catch (error) {
      console.error("Login error:", error);
      await signOut();
      return false;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("username");
      delete API.defaults.headers.common["Authorization"];
      setUserToken(null);
      setUsername(null);
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userToken, username, isLoading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

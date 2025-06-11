import React, { useContext, ReactNode, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../src/app/AuthContext";
import { router } from "expo-router";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userToken, isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.replace("/(auth)");
    }
  }, [isLoading, userToken, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!userToken) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

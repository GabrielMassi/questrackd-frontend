import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Wip } from "@/components/Wip";
import { useLocalSearchParams } from "expo-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useUsername } from "../hooks/useStorage";

export default function HomeScreen() {
  const { username } = useUsername();
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <Text style={styles.title}>Questrackd</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Text>Olá, {username || "Guest"}</Text>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    alignSelf: "auto",
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

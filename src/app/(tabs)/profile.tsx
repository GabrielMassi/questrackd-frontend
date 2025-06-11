import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "@/components/Themed";
import { Wip } from "@/components/Wip";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { router } from "expo-router";
import { ProfilePic } from "@/components/ProfilePic";
import { useUsername } from "../hooks/useStorage";

export default function ProfileScreen() {
  const { signOut } = useContext(AuthContext);
  const { username } = useUsername();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/(auth)");
  };
  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <ProfilePic />
        <Text style={styles.title}>{username || "Guest"}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSignOut()}>
          <Text style={styles.label}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    backgroundColor: "#0055aa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

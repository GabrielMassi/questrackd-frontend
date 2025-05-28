import React, { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { View } from "@/components/Themed";
import { API } from "../api";

export default function Index() {
  const handleSignIn = async () => {
    try {
      const response = await API.post("/auth/signin", { username, password });
      console.log("Token:", response.data.access_token);
      // Store token securely
      router.navigate("/(tabs)/home");
    } catch (error) {
      alert("Login Inválido.");
      console.log(error);
    }
  };
  function signUp() {
    router.navigate("/signUp");
  }
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questrackd</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        maxLength={16}
        value={username}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.buttonSet}>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.label}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.label}>Criar Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonSet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
  title: {
    color: "white",
    fontSize: 60,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#0055aa",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    width: 220,
    margin: 5,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
  },
});

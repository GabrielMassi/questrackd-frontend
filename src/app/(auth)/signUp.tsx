import React, { useState } from "react";
import { router } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import { View } from "@/components/Themed";
import { API } from "../api";

export default function signUp() {
  const handleSignUp = async () => {
    try {
      const aa = await API.post("/auth/signup", { username, password });
      console.log("User created successfully");
      alert("Usuário criado com sucesso!");
      router.back();
    } catch (error) {
      alert("Esse usuário já existe.");
      console.log(error);
    }
  };

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
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
      <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
        <Text style={styles.label}>Criar {username}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 40,
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
    margin: 5,
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("username");
        if (storedUser) setUsername(storedUser);
      } catch (error) {
        console.error("Failed to load username", error);
      }
    };

    loadUsername();
  }, []);

  const updateUsername = async (newUsername: string) => {
    try {
      await AsyncStorage.setItem("username", newUsername);
      setUsername(newUsername);
    } catch (error) {
      console.error("Failed to save username", error);
    }
  };

  return { username, updateUsername };
};

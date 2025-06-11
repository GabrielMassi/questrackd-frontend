import { FlatList, Pressable, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { Wip } from "@/components/Wip";
import { useEffect, useState } from "react";
import API from "../api";
import { Game } from "../types";
import { router, useRouter } from "expo-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUsername } from "../hooks/useStorage";

export default function SearchScreen() {
  const { username } = useUsername();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        fetchResults(searchTerm);
      } else {
        setResults([]);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const fetchResults = async (term: string) => {
    setLoading(true);
    try {
      const response = await API.post("/igdb/search-game", {
        input: term,
      });
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateToGame = (game: Game) => {
    router.push({
      pathname: "/games/[id]",
      params: {
        id: game.id.toString(),
        name: game.name,
        coverUrl: game.cover?.url || "",
        summary: game.summary,
        username: username,
      },
    });
  };

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <TextInput
          placeholder="Search games..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm} // Updates on every keystroke
          style={{
            color: "#FFFFFF",
            backgroundColor: "#222",
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
          }}
        />
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item: Game) => item.id.toString()}
            renderItem={({ item }: { item: Game }) => (
              <Pressable
                onPress={() => navigateToGame(item)}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  padding: 10,
                })}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
              </Pressable>
            )}
          />
        )}
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
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

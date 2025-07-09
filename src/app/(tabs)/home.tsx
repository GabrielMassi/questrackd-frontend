import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Wip } from "@/components/Wip";
import { router, useLocalSearchParams } from "expo-router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { useUsername } from "../hooks/useStorage";
import ListDisplay from "@/components/ListDisplay";
import { Game } from "../types";
import API from "../api";
import { loadAllShelves } from "../loadShelves";

export default function HomeScreen() {
  const { username } = useUsername();

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

  const [shelves, setShelves] = useState<{
    favs: Game[];
    playing: Game[];
    played: Game[];
    wish: Game[];
  }>({ favs: [], playing: [], played: [], wish: [] });

  useEffect(() => {
    const loadShelves = async () => {
      try {
        console.log("Loading shelves for:", username || "Guest");
        const loadedShelves = await loadAllShelves(username || "Guest");
        console.log(
          "Loaded shelves data:",
          JSON.stringify(loadedShelves, null, 2)
        );
        setShelves(loadedShelves);
        console.log("Shelves state updated");
      } catch (error) {
        console.error("Failed to load shelves:", error);
      }
    };

    loadShelves();
  }, [username]);

  return (
    <ProtectedRoute>
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Questrackd</Text>
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Text>Olá, {username || "Guest"}</Text>
          <ListDisplay
            items={shelves.favs}
            title="Favorites"
            onItemPress={navigateToGame}
          ></ListDisplay>
          <ListDisplay
            items={shelves.wish}
            title="Wish List"
            onItemPress={navigateToGame}
          ></ListDisplay>
          <ListDisplay
            items={shelves.playing}
            title="Playing"
            onItemPress={navigateToGame}
          ></ListDisplay>
          <ListDisplay
            items={shelves.played}
            title="Played"
            onItemPress={navigateToGame}
          ></ListDisplay>
        </ScrollView>
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

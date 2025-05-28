import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";

export default function GamePage() {
  // Get the ID from the URL
  const { id, name, coverUrl, summary } = useLocalSearchParams<{
    id: string;
    name?: string;
    coverUrl?: string;
    summary?: string;
  }>();

  const fullImageUrl = coverUrl
    ? `https:${coverUrl.replace("t_thumb", "t_cover_big")}`
    : null;

  return (
    <View style={{ padding: 20 }}>
      {fullImageUrl && (
        <Image
          source={{ uri: fullImageUrl }}
          style={{
            width: "100%",
            height: 300,
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
      )}
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.body}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#ffa500",
  },
  body: {
    fontSize: 10,
    textAlign: "justify",
    color: "#ddd",
  },
});

import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ScrollView } from "react-native";
import { AuthContext } from "../AuthContext";
import API from "../api";
import { useUsername } from "../hooks/useStorage";

export default function GamePage() {
  const { id, name, coverUrl, summary, username } = useLocalSearchParams<{
    id: string;
    name?: string;
    coverUrl?: string;
    summary?: string;
    username: string;
  }>();

  console.log(username);

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    try {
      await API.post("/ratings", {
        gameId: id,
        usernamename: username,
        rating: newRating,
      });
      console.log("alo?");
    } catch (error) {
      console.error("Failed to save rating:", error);
    }
  };

  const submitReview = async () => {
    try {
      await API.post("/ratings", {
        gameId: id,
        usernamename: username,
        review,
      });
      console.log("alo?");
      alert("Review submitted!");
    } catch (error) {
      alert("Failed to submit review");
      console.error(error);
    }
  };

  const fullImageUrl = coverUrl
    ? `https:${coverUrl.replace("t_thumb", "t_cover_big")}`
    : null;

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  useEffect(() => {
    const loadusernameRating = async () => {
      try {
        console.log(username);
        const response = await API.get(`/ratings/${id}/${username}`, {
          params: {
            gameId: id,
            usernamename: username,
          },
        });
        if (response.data) {
          setRating(response.data.rating || 0);
          setReview(response.data.review || "");
        }
      } catch (error) {
        console.error("Failed to load rating:", error);
      }
    };

    loadusernameRating();
  }, [id]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#222",
      }}
    >
      {fullImageUrl && (
        <Image source={{ uri: fullImageUrl }} style={styles.image} />
      )}

      <Text style={styles.title}>{name}</Text>

      <Text style={styles.summary}>{summary}</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.ratingLabel}>Rate this game:</Text>
        <StarRating
          rating={rating}
          onChange={handleRatingChange}
          starSize={28}
        />
      </View>

      <Text style={styles.reviewLabel}>Your Review:</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.reviewInput}
        onChangeText={setReview}
        value={review}
        placeholder="Deixe sua review..."
      />
      <Button
        title="Submit Review"
        onPress={submitReview}
        disabled={!review.trim()}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: "#222",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffa500",
    marginBottom: 15,
    textAlign: "center",
  },
  summary: {
    fontSize: 16,
    lineHeight: 22,
    color: "#ddd",
    marginBottom: 25,
    textAlign: "justify",
  },
  ratingContainer: {
    marginBottom: 25,
    alignItems: "center",
  },
  ratingLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  reviewLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  reviewInput: {
    height: 120,
    textAlignVertical: "top",
    backgroundColor: "#333",
    padding: 12,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
});

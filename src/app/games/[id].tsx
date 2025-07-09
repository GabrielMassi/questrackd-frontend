import { useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import { ScrollView } from "react-native";
import { AuthContext } from "../AuthContext";
import API from "../api";
import { useUsername } from "../hooks/useStorage";
import { Picker } from "@react-native-picker/picker";

export default function GamePage() {
  const { id, name, coverUrl, summary, username } = useLocalSearchParams<{
    id: string;
    name?: string;
    coverUrl?: string;
    summary?: string;
    username: string;
  }>();

  const handleRatingChange = async (newRating: number) => {
    setRating(newRating);
    try {
      await API.post("/ratings", {
        gameId: id,
        username: username,
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
        username: username,
        review,
      });
      console.log("alo?");
      alert("Review submitted!");
    } catch (error) {
      alert("Failed to submit review");
      console.error(error);
    }
  };

  const handlePicker = async (gameId: string, opt: string) => {
    try {
      await API.post("/shelf", {
        username: username,
        gameId: gameId,
        shelfType: opt,
      });
    } catch (error) {
      alert("Failed to add game to a shelf");
      console.error(error);
    }
  };

  const fullImageUrl = coverUrl
    ? `https:${coverUrl.replace("t_thumb", "t_cover_big")}`
    : null;

  const [rating, setRating] = useState(0);

  const [review, setReview] = useState("");

  const [selectedValue, setSelectedValue] = useState("option1");

  useEffect(() => {
    const loadusernameRating = async () => {
      try {
        console.log(username);
        const response = await API.get(`/ratings/${id}/${username}`, {
          params: {
            gameId: id,
            username: username,
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
    <KeyboardAvoidingView behavior="height">
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "#222",
          paddingBottom: 50,
        }}
      >
        {fullImageUrl && (
          <Image source={{ uri: fullImageUrl }} style={styles.image} />
        )}
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.summary}>{summary}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.label}>Rate this game:</Text>
          <StarRating
            rating={rating}
            onChange={handleRatingChange}
            starSize={28}
          />
        </View>
        <Text style={styles.label}>Your Review:</Text>
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              if (itemValue !== "neutral") {
                setSelectedValue(itemValue);
                handlePicker(id, itemValue);
                setSelectedValue("neutral");
              }
            }}
            style={styles.picker}
            dropdownIconColor="#fff"
          >
            <Picker.Item
              label="Add to shelf..."
              value="neutral"
              style={styles.neutralItem}
            />
            <Picker.Item
              label="⭐ Favorite"
              value="favorite"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="🎮 Playing"
              value="playing"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="✅ Played"
              value="played"
              style={styles.pickerItem}
            />
            <Picker.Item
              label="📝 Wishlist"
              value="wishlist"
              style={styles.pickerItem}
            />
          </Picker>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    backgroundColor: "#222",
    paddingBottom: 50,
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
  label: {
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    backgroundColor: "#333",
    overflow: "hidden",
    marginVertical: 10,
  },
  picker: {
    color: "#fff",
    height: 50,
    paddingHorizontal: 15,
  },
  pickerItem: {
    color: "#fff",
    backgroundColor: "#333",
    fontSize: 16,
  },
  neutralItem: {
    backgroundColor: "#333",
    color: "#aaa",
    fontStyle: "italic",
  },
});

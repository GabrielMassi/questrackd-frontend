import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Game } from "@/src/app/types";

const placeholderImage = require("../assets/images/placeholder.png");

type ListDisplayProps = {
  title?: string;
  items: Game[];
  onItemPress?: (item: Game) => void;
};

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.35;

const ListDisplay: React.FC<ListDisplayProps> = ({
  title,
  items,
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        decelerationRate="fast"
        snapToInterval={ITEM_WIDTH + 10} // Adjust for margin
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.item}
            onPress={() => onItemPress?.(item)}
            activeOpacity={0.7}
          >
            <Image
              source={item.cover ? { uri: item.cover.url } : placeholderImage}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  item: {
    width: ITEM_WIDTH,
    marginRight: 10,
  },
  image: {
    width: "100%",
    height: ITEM_WIDTH * 1.5, // 3:2 aspect ratio
    borderRadius: 5,
    backgroundColor: "#333", // Fallback color while loading
  },
  itemTitle: {
    color: "white",
    marginTop: 5,
    fontSize: 12,
  },
});

export default ListDisplay;

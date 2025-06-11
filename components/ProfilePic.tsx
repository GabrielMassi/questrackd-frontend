import { Image, StyleSheet } from "react-native";

export function ProfilePic() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/profpic.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    marginVertical: 100,
    width: 300,
    height: 300,
  },
});

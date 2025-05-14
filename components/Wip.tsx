import { Image, StyleSheet } from "react-native";

export function Wip() {
  return (
    <Image style={styles.image} source={require("@/assets/images/wip.png")} />
  );
}

const styles = StyleSheet.create({
  image: {
    marginVertical: 100,
    width: 300,
    height: 300,
  },
});

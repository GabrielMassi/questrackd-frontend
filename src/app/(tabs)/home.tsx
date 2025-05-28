import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { Wip } from "@/components/Wip";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Questrackd</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Wip />
    </View>
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

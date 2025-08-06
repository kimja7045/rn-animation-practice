import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function DarkModeOverlay() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#151718" : "white";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View>
        <Text>DarkModeOverlay</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

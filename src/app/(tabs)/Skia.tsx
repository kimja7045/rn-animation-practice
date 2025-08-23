import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function SkiaTabScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#151718" : "white";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View>
        <Text>Skia</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

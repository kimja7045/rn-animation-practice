import { SafeAreaView, StyleSheet } from "react-native";
import { HelloWorld } from "../../_skia/component/HelloWorld";
import { useColorScheme } from "../../hooks/useColorScheme";

export default function SkiaTabScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#151718" : "white";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <HelloWorld />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

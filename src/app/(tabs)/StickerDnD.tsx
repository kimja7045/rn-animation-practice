import { SafeAreaView, StyleSheet, View } from "react-native";
import { useColorScheme } from "../../hooks/useColorScheme";
import { StickerList } from "../../stickerDnD/component/StickerList";

export default function StickerDnDTabScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#151718" : "white";

  return (
    <SafeAreaView style={[styles.safeAreaView, { backgroundColor }]}>
      <View style={styles.container}>
        <StickerList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

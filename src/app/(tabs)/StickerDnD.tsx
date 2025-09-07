import { SafeAreaView, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";
import { Board } from "../../stickerDnD/component/Board";
import { StickerList } from "../../stickerDnD/component/StickerList";

export default function StickerDnDTabScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeAreaView, { backgroundColor: colors.primary }]}>
      <View style={styles.container}>
        <Board />
        <StickerList />
      </View>
    </SafeAreaView>
  );
}

const BOTTOM_TAB_HEIGHT = 48;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: BOTTOM_TAB_HEIGHT,
  },
});

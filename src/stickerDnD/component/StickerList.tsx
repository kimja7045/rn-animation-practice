import { StyleSheet, View } from "react-native";
import { stickers } from "../../assets/stickers";
import { useTheme } from "../../hooks/useTheme";
import { Sticker } from "./Sticker";

export const StickerList = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.stickerList, { backgroundColor: colors.secondary }]}>
      {stickers.map((sticker, index) => (
        <Sticker key={index} sticker={sticker} index={index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stickerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 16,
    padding: 16,
    marginTop: 8,
  },
});

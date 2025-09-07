import { StyleSheet, View } from "react-native";
import { stickers } from "../../assets/stickers";
import { Sticker } from "./Sticker";

export const StickerList = () => {
  return (
    <View style={styles.stickerList}>
      {stickers.map((sticker, index) => (
        <Sticker key={index} sticker={sticker} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  stickerList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

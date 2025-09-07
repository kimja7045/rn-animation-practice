import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

export const Sticker = ({ sticker }: { sticker: ImageSourcePropType }) => {
  return (
    <View>
      <Image source={sticker} style={styles.sticker} />
    </View>
  );
};

const styles = StyleSheet.create({
  sticker: {
    width: 80,
    height: 80,
  },
});

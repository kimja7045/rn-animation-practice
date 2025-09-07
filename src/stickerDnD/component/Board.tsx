import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "../../hooks/useTheme";

export const Board = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={[styles.image, { borderColor: colors.secondary }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "80%",
    borderWidth: 8,
    borderRadius: 20,
  },
});

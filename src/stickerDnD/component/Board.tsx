import { FontAwesome } from "@expo/vector-icons";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface BoardProps {
  onReset: VoidFunction;
}

const BOARD_BG_IMAGE_URL =
  "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=20250805195752019609a1f3094311109215171.jpg";

export const Board = ({ onReset }: BoardProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onReset} style={styles.resetButton}>
        <FontAwesome name="trash-o" size={32} color={colors.default} />
      </TouchableOpacity>
      <Image
        source={{
          uri: BOARD_BG_IMAGE_URL,
        }}
        style={[
          styles.image,
          { borderColor: colors.secondary, width: width - 24 },
        ]}
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
    height: "100%",
    borderRadius: 8,
  },
  resetButton: {
    position: "absolute",
    top: 16,
    right: 32,
    zIndex: 1,
  },
});

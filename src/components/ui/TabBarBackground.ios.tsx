import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { StyleSheet, useColorScheme } from "react-native";

export default function BlurTabBarBackground() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#151718" : "white";

  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="systemChromeMaterial"
      intensity={100}
      style={[StyleSheet.absoluteFill, { backgroundColor }]}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}

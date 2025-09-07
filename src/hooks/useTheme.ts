import { useColorScheme } from "react-native";

const theme = {
  light: {
    colors: {
      primary: "skyblue",
      secondary: "#fff",
      default: "white",
    },
  },
  dark: {
    colors: {
      primary: "skyblue",
      secondary: "#fff",
      default: "white",
    },
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return theme[colorScheme ?? "light"];
};

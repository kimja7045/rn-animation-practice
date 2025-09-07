import { useColorScheme } from "react-native";

const theme = {
  light: {
    colors: {
      primary: "#dc2626",
      secondary: "#fff",
      white: "#fff",
    },
  },
  dark: {
    colors: {
      primary: "#991b1b",
      secondary: "#052e16",
      white: "#fff",
    },
  },
};

export const useTheme = () => {
  const colorScheme = useColorScheme();
  return theme[colorScheme ?? "light"];
};

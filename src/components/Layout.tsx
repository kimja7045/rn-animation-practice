import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type LayoutProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Flex = ({ children, style }: LayoutProps) => {
  return <View style={[styles.flex, style]}>{children}</View>;
};

export const Row = ({ children, style }: LayoutProps) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export const Column = ({ children, style }: LayoutProps) => {
  return <View style={[styles.column, style]}>{children}</View>;
};

export const Center = ({ children, style }: LayoutProps) => {
  return <Flex style={[styles.center, style]}>{children}</Flex>;
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

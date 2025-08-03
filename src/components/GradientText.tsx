import MaskedView from "@react-native-masked-view/masked-view";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

type GradientTextProps = {
  text: string;
  textStyle?: StyleProp<TextStyle>;
};

export const GradientText = ({ text, textStyle }: GradientTextProps) => {
  return (
    <MaskedView
      style={styles.maskContainer}
      maskElement={
        <View style={styles.mask}>
          {text.split("").map((char, index) => (
            <Animated.Text
              style={[styles.greeting, textStyle]}
              key={index}
              entering={FadeInDown.delay(index * 33)
                .springify()
                // .damping(10)
                .mass(2)}>
              {char}
            </Animated.Text>
          ))}
        </View>
      }>
      <Animated.View
        style={[
          styles.gradient,
          {
            animationName: {
              to: {
                transform: [{ rotate: "360deg" }],
              },
            },
            animationDuration: "3s",
            animationIterationCount: "infinite",
          },
        ]}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  greeting: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
  gradient: {
    experimental_backgroundImage:
      "linear-gradient(90deg,rgba(247, 57, 247, 1) 0%, rgba(220, 128, 245, 1) 45%, rgba(15, 135, 247, 1) 100%)",
    width: "100%",
    height: "100%",
  },
  maskContainer: {
    flex: 1,
    flexDirection: "row",
  },
  mask: {
    // Transparent background because mask is based off alpha channel.
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

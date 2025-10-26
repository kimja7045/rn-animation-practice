import MaskedView from "@react-native-masked-view/masked-view";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import Animated, {
  ComplexAnimationBuilder,
  FadeInDown,
} from "react-native-reanimated";

interface GradientTextProps {
  text: string;
  /**
   * @description
   * Reanimated의 Entering/Exiting animation type 주입 가능
   * @example Fade, Slide, Roll, Pinwheel 등등
   */
  preset: typeof ComplexAnimationBuilder;
  bounce?: number;
  delay?: number;
  mass?: number;
  duration?: number;
  textStyle?: StyleProp<TextStyle>;
  gradientColors?: string[];
}

export const GradientText = ({
  text,
  preset = FadeInDown,
  bounce,
  delay = 33,
  mass = 2,
  duration = 3,
  gradientColors = [
    "rgba(247, 57, 247, 1)",
    "rgba(220, 128, 245, 1)",
    "rgba(15, 135, 247, 1)",
  ],
  textStyle,
}: GradientTextProps) => {
  const getAnimationConfig = (index: number) => {
    let animation = preset.delay(index * delay).springify();

    if (bounce) {
      animation = animation.damping(bounce);
    }

    return animation.mass(mass);
  };

  const gradientStyle = {
    experimental_backgroundImage: `linear-gradient(90deg, ${gradientColors.join(
      ",",
    )})`,
  };

  const animationStyle = {
    animationName: {
      to: {
        transform: [{ rotate: "360deg" }],
      },
    },
    animationDuration: `${duration}s`,
    animationIterationCount: "infinite",
  };

  return (
    <MaskedView
      style={styles.maskContainer}
      maskElement={
        <View style={styles.mask}>
          {text.split("").map((char, index) => (
            <Animated.Text
              style={[styles.greeting, textStyle]}
              key={index}
              entering={getAnimationConfig(index)}>
              {char}
            </Animated.Text>
          ))}
        </View>
      }>
      <Animated.View style={[styles.gradient, gradientStyle, animationStyle]} />
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

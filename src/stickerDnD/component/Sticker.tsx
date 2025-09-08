import React from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const Sticker = ({ sticker }: { sticker: ImageSourcePropType }) => {
  const pressed = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withSpring(pressed.value ? 1.5 : 1) },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      pressed.value = false;
    });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.Image
        source={sticker}
        style={[styles.sticker, animatedStyle]}
      />
    </GestureDetector>
  );
};

const SIZE = 90;

const styles = StyleSheet.create({
  sticker: {
    width: SIZE,
    height: SIZE,
  },
});

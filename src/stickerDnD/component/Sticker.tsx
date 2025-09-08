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

  const tapGesture = Gesture.Tap()
    .onBegin(() => {
      pressed.value = !pressed.value;
    })
    .onEnd(() => {
      pressed.value = false;
    });

  const panGesture = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(tapGesture, panGesture)}>
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

import { AntDesign } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Footer = () => {
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);

    setTimeout(() => {
      textInputRef.current?.blur();
      textInputRef.current?.clear();
    }, 100);

    setTimeout(() => {
      setIsSending(false);
    }, 800);
  };

  return (
    <View style={styles.footer}>
      <TextInput
        ref={textInputRef}
        style={[
          styles.input,
          {
            borderColor: isFocused ? "#3b82f6" : "#94a3b8",
          },
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}></TextInput>
      <Animated.View
        style={{
          transitionProperty: ["transform", "opacity"],
          transitionDuration: "200ms",
          transform: [
            { scale: isPressed ? 0.8 : 1 },
            { translateY: isSending ? -200 : 0 },
          ],
          opacity: isSending ? 0 : 1,
        }}>
        <AnimatedPressable
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          onPress={handleSend}
          style={[
            styles.sendButton,
            {
              transitionProperty: ["opacity", "marginLeft", "transform"],
              transitionDuration: "300ms",
              opacity: isFocused ? 1 : 0,
              marginLeft: isFocused ? 0 : -50,
              transform: [{ translateX: isFocused ? 0 : 58 }],
            },
          ]}>
          <AntDesign name="arrowup" size={24} color="white" />
        </AnimatedPressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#94a3b8",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  sendButton: {
    backgroundColor: "#3b82f6",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    flex: 1,
    gap: 10,
    padding: 16,
  },
});

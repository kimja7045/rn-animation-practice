import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  clamp,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";
import { minions as CAROUSEL_IMAGES } from "../assets/images/minions";

const { width } = Dimensions.get("screen");
const ITEM_SIZE = width * 0.24;
const SPACING = 12;
const ITEM_TOTAL_SIZE = ITEM_SIZE + SPACING;

export const CircularCarousel = () => {
  const scrollX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = clamp(
      e.contentOffset.x / ITEM_TOTAL_SIZE,
      0,
      CAROUSEL_IMAGES.length - 1,
    );
    const newActiveIndex = Math.round(scrollX.value);
    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        style={styles.listContainer}
        contentContainerStyle={{
          gap: SPACING,
          paddingHorizontal: (width - ITEM_SIZE) / 2,
        }}
        data={CAROUSEL_IMAGES}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => <CarouselItem imageUrl={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} // ~16ms
        snapToInterval={ITEM_TOTAL_SIZE}
        decelerationRate="fast"
      />
    </View>
  );
};

const CarouselItem = ({ imageUrl }: { imageUrl: ImageSourcePropType }) => {
  return (
    <Animated.View style={[styles.image]}>
      <Image source={imageUrl} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "black",
  },
  listContainer: {
    flexGrow: 0,
    height: ITEM_SIZE * 2,
    marginBottom: 48,
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
  },
});

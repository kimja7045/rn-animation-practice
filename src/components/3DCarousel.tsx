import { AntDesign } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { minions } from "../assets/images/minions";

const { width, height } = Dimensions.get("screen");

const IMAGE_WIDTH = width * 0.65;
const IMAGE_HEIGHT = height * 0.35;
const SPACING = 20;

const image_urls = [...minions];

const DATA = image_urls.map((image, index) => ({
  key: index.toString(),
  image,
  title: `Minion ${index + 1}`,
  subtitle: `MinionSubtitle ${index + 1}`,
  price: `${index + 1}00`,
}));

export const ThreeDimensionalCarousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = Animated.modulo(Animated.divide(scrollX, width), width);
  const flatListRef = useRef<FlatList>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: IMAGE_HEIGHT * 1.8, alignItems: "center" }}>
        <Animated.FlatList
          ref={flatListRef}
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            },
          )}
          bounces={false}
          style={{ flexGrow: 0, zIndex: 9999 }}
          contentContainerStyle={{
            height: IMAGE_HEIGHT + SPACING * 2,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CarouselItem image={item.image} index={index} scrollX={scrollX} />
          )}
        />
        <View
          style={{
            width: IMAGE_WIDTH,
            alignItems: "center",
            zIndex: 99,
          }}>
          {DATA.map((item, index) => {
            const inputRange = [
              (index - 0.2) * width,
              index * width,
              (index + 0.2) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            const rotateY = scrollX.interpolate({
              inputRange,
              outputRange: ["45deg", "0deg", "45deg"],
            });

            return (
              <Animated.View
                key={item.key}
                style={{
                  position: "absolute",
                  opacity,
                  transform: [{ perspective: IMAGE_WIDTH * 4 }, { rotateY }],
                }}>
                <CarouselItemInfo item={item} />
              </Animated.View>
            );
          })}
        </View>
        <Animated.View
          style={{
            width: IMAGE_WIDTH + SPACING * 2,
            height: IMAGE_HEIGHT * 1.5,
            position: "absolute",
            backgroundColor: "white",
            backfaceVisibility: "visible",
            zIndex: -1,
            top: SPACING * 2,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 0 },
            transform: [
              {
                perspective: IMAGE_WIDTH * 4,
              },
              {
                rotateY: progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "90deg", "180deg"],
                }),
              },
            ],
          }}
        />
      </View>
      {flatListRef.current && (
        <CarouselIndexController listRef={flatListRef.current} />
      )}
    </SafeAreaView>
  );
};

const CarouselIndexController = ({ listRef }: { listRef: FlatList }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const changeIndex = useCallback(
    (newIndex: number) => {
      listRef.scrollToOffset({
        offset: newIndex * width,
        animated: true,
      });
      setActiveIndex(newIndex);
    },
    [listRef],
  );

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: SPACING,
        paddingHorizontal: SPACING * 2,
      }}>
      <TouchableOpacity
        disabled={activeIndex === 0}
        style={{ opacity: activeIndex === 0 ? 0.2 : 1 }}
        onPress={() => {
          changeIndex(activeIndex - 1);
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="swapleft" size={42} color="black" />
          <Text style={{ fontSize: 12, fontWeight: "800" }}>PREV</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={activeIndex === DATA.length - 1}
        style={{ opacity: activeIndex === DATA.length - 1 ? 0.2 : 1 }}
        onPress={() => {
          changeIndex(activeIndex + 1);
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <AntDesign name="swapright" size={42} color="black" />
          <Text style={{ fontSize: 12, fontWeight: "800" }}>NEXT</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const CarouselItem = ({
  image,
  index,
  scrollX,
}: {
  image: ImageSourcePropType;
  index: number;
  scrollX: any;
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [50, 0, 20],
  });

  return (
    <Animated.View
      style={{
        width,
        opacity,
        transform: [{ translateY }],
      }}>
      <Image
        source={image}
        style={{
          alignSelf: "center",
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
        }}
      />
    </Animated.View>
  );
};

const CarouselItemInfo = ({ item }) => {
  return (
    <>
      <Text
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: 16,
          textTransform: "uppercase",
        }}
        numberOfLines={1}
        adjustsFontSizeToFit>
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: 12,
          opacity: 0.4,
          textAlign: "center",
        }}>
        {item.subtitle}
      </Text>
      <View style={{ flexDirection: "row", marginTop: SPACING }}>
        <Text
          style={{
            fontSize: 42,
            letterSpacing: 5,
            fontWeight: "900",
            marginRight: 8,
          }}>
          {item.price}
        </Text>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 36,
            fontWeight: "800",
            alignSelf: "flex-end",
          }}>
          USD
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SPACING * 4,
  },
});

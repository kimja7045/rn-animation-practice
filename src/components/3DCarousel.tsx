import { AntDesign } from "@expo/vector-icons";
import { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { minions } from "../assets/images/minions";

const { width, height } = Dimensions.get("screen");

const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = height * 0.7;
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: IMAGE_HEIGHT * 2.1 }}>
        <Animated.FlatList
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
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            height: IMAGE_HEIGHT / 2 + SPACING * 2,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Animated.View
                style={{
                  width,
                  paddingVertical: SPACING,
                }}>
                <Image
                  source={item.image}
                  style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT / 2 }}
                />
              </Animated.View>
            );
          }}
        />
        <View
          style={{
            width: IMAGE_WIDTH,
            alignItems: "center",
            paddingHorizontal: SPACING * 2,
            marginLeft: SPACING * 2,
          }}>
          <CarouselItemInfo item={DATA[0]} />
        </View>
        <View
          style={{
            width: IMAGE_WIDTH + SPACING * 2,
            height: IMAGE_HEIGHT / 1.25,
            position: "absolute",
            backgroundColor: "white",
            backfaceVisibility: "visible",
            zIndex: -1,
            top: SPACING * 2,
            left: SPACING,
            // bottom: 0,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 0 },
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: IMAGE_WIDTH + SPACING * 4,
          padding: SPACING,
        }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="swapleft" size={42} color="black" />
            <Text style={{ fontSize: 12, fontWeight: "800" }}>PREV</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="swapright" size={42} color="black" />
            <Text style={{ fontSize: 12, fontWeight: "800" }}>NEXT</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    // marginTop: SPACING * 4,
  },
});

import { SafeAreaView, StyleSheet } from "react-native";
import { CircularSlider } from "../../components/CircularSlider";

export default function CircularSliderScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CircularSlider />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

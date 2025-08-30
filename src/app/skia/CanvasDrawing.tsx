import {
  Canvas,
  Path,
  PathProps,
  Skia,
  SkPath,
} from "@shopify/react-native-skia";
import { useCallback, useState } from "react";
import { Button, GestureResponderEvent, StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

type Stroke = {
  path: PathProps["path"];
  color: string;
  width: number;
};

export default function CanvasDrawing() {
  const [color, setColor] = useState("black");
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentPath = useSharedValue<SkPath | null>(null);

  const handleTouchStart = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    const path = Skia.Path.Make();
    path.moveTo(locationX, locationY);
    currentPath.value = path;
  };

  const handleTouchMove = (e: GestureResponderEvent) => {
    const { locationX, locationY } = e.nativeEvent;
    if (currentPath.value) {
      currentPath.value.lineTo(locationX, locationY);
    }
  };

  const handleTouchEnd = () => {
    if (currentPath.value) {
      setStrokes((prev) => [
        ...prev,
        { path: currentPath.value, color, width: 4 },
      ]);
      currentPath.value = null;
    }
  };

  const clearCanvas = useCallback(() => setStrokes([]), []);

  return (
    <View style={styles.container}>
      <Canvas
        style={styles.canvas}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        {strokes.map((s, idx) => (
          <Path
            key={idx}
            path={s.path}
            color={s.color}
            style="stroke"
            strokeWidth={s.width}
          />
        ))}
        {currentPath.value && (
          <Path
            path={currentPath.value}
            color={color}
            style="stroke"
            strokeWidth={4}
          />
        )}
      </Canvas>
      <View style={styles.toolbar}>
        <Button title="🖤 Black" onPress={() => setColor("black")} />
        <Button title="🔴 Red" onPress={() => setColor("red")} />
        <Button title="🔵 Blue" onPress={() => setColor("blue")} />
        <Button title="Clear" onPress={clearCanvas} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  canvas: { flex: 1 },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#eee",
  },
});

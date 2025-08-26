import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import { router } from "expo-router";
import { Button } from "react-native";
import { Center } from "../../components/Layout";

export const HelloWorld = () => {
  const width = 256;
  const height = 256;
  const r = width * 0.33;

  return (
    <Center>
      <Canvas style={{ width, height }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={width - r} cy={r} r={r} color="magenta" />
          <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
        </Group>
      </Canvas>

      <Button
        title="move canvas drawing"
        onPress={() => {
          router.push("/skia/CanvasDrawing");
        }}
      />
    </Center>
  );
};

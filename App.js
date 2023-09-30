import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber/native";
import {
  SensorType,
  useAnimatedSensor,
  useSharedValue,
} from "react-native-reanimated";

function Box(props) {
  const meshRef = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });
  useFrame((state, delta) => {
    let { x, y, z } = animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    meshRef.current.rotation.x += x;
    meshRef.current.rotation.y += y;
  });
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry />
      <meshStandardMaterial color={"#fff"} />
    </mesh>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ flex: 1 }}>
        <directionalLight position={[10, 10, 5]} color={"blue"} intensity={2} />
        <directionalLight
          position={[-10, -10, -5]}
          color={"red"}
          intensity={2}
        />
        <directionalLight
          position={[-10, 10, -5]}
          color={"gray"}
          intensity={5}
        />
        <Box position={[0, 0, 0]} />
      </Canvas>
      <Text style={styles.title}>React Native + Three JS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    position: "absolute",
    alignSelf: "center",
    bottom: 100,
  },
});

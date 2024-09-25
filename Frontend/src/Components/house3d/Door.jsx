import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Door Component
const Door = ({ width, height, position, rotation, texture }) => {
  const doorTexture = useLoader(TextureLoader, texture);
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[width, height, 0.05]} />
      <meshStandardMaterial map={doorTexture} />
    </mesh>
  );
};

export default Door;

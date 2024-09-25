import React from "react";
import { Box } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const Wall = ({ width, height, thickness, position, rotation, texture }) => {
  const wallTexture = useLoader(TextureLoader, texture);

  return (
    <mesh position={position} rotation={rotation}>
      <Box args={[width, height, thickness]}>
        <meshStandardMaterial map={wallTexture} />
      </Box>
    </mesh>
  );
};

export default Wall;

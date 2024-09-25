import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Floor Component
const Floor = ({ width, depth, position, texture }) => {
  const floorTexture = useLoader(TextureLoader, texture);
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial map={floorTexture} />
    </mesh>
  );
};

export default Floor;

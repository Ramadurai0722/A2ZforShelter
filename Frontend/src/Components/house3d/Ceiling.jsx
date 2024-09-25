import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// Ceiling Component
const Ceiling = ({ width, depth, position, color = 0xdddddd, texture }) => {
  const ceilingTexture = texture ? useLoader(TextureLoader, texture) : null;
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={color} map={ceilingTexture} />
    </mesh>
  );
};

export default Ceiling;

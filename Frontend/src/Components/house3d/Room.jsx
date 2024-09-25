import React from "react";
import { Text } from "@react-three/drei";
import WallGroup from "./WallGroup";
import Floor from "./Floor";
import Ceiling from "./Ceiling";
import Door from "./Door";

const Room = ({
  width,
  height,
  depth,
  position,
  doorConfig,
  textures,
  roomName,
  interior
}) => {
   console.log("Interior selected:", interior);
  return (
    <group position={position}>
    {/* <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial map={textures[interior]} />
    </mesh> */}

      
      {/* Floor */}
      <Floor
        width={width}
        depth={depth}
        position={[0, 0, 0]} // Ensure it's at the bottom of the room
        texture={textures.floor}
      />

      {/* Ceiling */}
      <Ceiling
        width={width}
        depth={depth}
        position={[0, height / 2, 0]}
        texture={textures.ceiling}
      />

      {/* Walls */}
      <WallGroup
        width={width}
        height={height}
        depth={depth}
        textures={textures}
      />

      {/* Door */}
      {doorConfig && (
        <Door
          width={doorConfig.width}
          height={doorConfig.height}
          position={doorConfig.position}
          rotation={doorConfig.rotation}
          texture={textures.door}
        />
      )} 

      {/* Room Name */}
      <Text
        position={[0, height + 2, 0]} // Adjust to ensure text is above room
        fontSize={0.5} // Adjust font size for readability
        color="black" // Adjust color if needed
        anchorX="center" // Center text horizontally
        anchorY="middle" // Center text vertically
      >
        {roomName}
      </Text>
    </group>
  );
};

export default Room;

import React from "react";
import Wall from "./Wall";

const WallGroup = ({ width, height, depth, textures }) => (
  <>
    <Wall
      width={width}
      height={height}
      thickness={0.1} // Wall thickness along the Z-axis
      position={[0, height / 2, depth / 2]}
      rotation={[0, 0, 0]}
      texture={textures.wall} // Pass texture to the Wall component
    />
    <Wall
      width={width}
      height={height}
      thickness={0.1} // Wall thickness along the Z-axis
      position={[0, height / 2, -depth / 2]}
      rotation={[0, 0, 0]}
      texture={textures.wall} // Pass texture to the Wall component
    />
    <Wall
      width={depth}
      height={height}
      thickness={0.1} // Wall thickness along the X-axis
      position={[-width / 2, height / 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
      texture={textures.wall} // Pass texture to the Wall component
    />
    <Wall
      width={depth}
      height={height}
      thickness={0.1} // Wall thickness along the X-axis
      position={[width / 2, height / 2, 0]}
      rotation={[0, Math.PI / 2, 0]}
      texture={textures.wall} // Pass texture to the Wall component
    />
  </>
);

export default WallGroup;

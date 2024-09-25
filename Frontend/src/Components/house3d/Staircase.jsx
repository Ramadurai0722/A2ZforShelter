// import React from "react";
// import { useFrame } from "@react-three/fiber";

// const Staircase = ({ steps, width, height, position }) => {
//   return (
//     <group position={position}>
//       {Array.from({ length: steps }).map((_, index) => (
//         <mesh key={index} position={[0, index * height, 0]}>
//           <boxGeometry args={[width, height, width]} />
//           <meshStandardMaterial color="brown" />
//         </mesh>
//       ))}
//     </group>
//   );
// };

// export default Staircase;





import React from "react";

const Staircase = ({ steps, width, height, position }) => {
  return (
    <group position={position}>
      {Array.from({ length: steps }).map((_, index) => (
        <mesh key={index} position={[0, index * height, 0]}>
          <boxGeometry args={[width, height, width]} />
          <meshStandardMaterial color="saddlebrown" />
        </mesh>
      ))}
    </group>
  );
};

export default Staircase;

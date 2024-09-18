// import React, { useRef, useState } from 'react';
// import { Canvas, useLoader } from '@react-three/fiber';
// import { Box, OrbitControls } from '@react-three/drei';
// import * as THREE from 'three';

// const Room3D = ({ houseWidth, houseHeight, rooms }) => {
//   // Load textures for walls, floor, and ceiling
//   const wallTexture = useLoader(THREE.TextureLoader, '/textures/wall.jpg');
//   const floorTexture = useLoader(THREE.TextureLoader, '/textures/floor.jpg');
//   const ceilingTextures = [
//     useLoader(THREE.TextureLoader, '/textures/ceiling.jpg'),
//     useLoader(THREE.TextureLoader, '/textures/ceiling2.jpg'),
//     useLoader(THREE.TextureLoader, '/textures/ceiling3.jpg'),
//   ];

//   // Group for rooms and rotation state for doors
//   const roomGroupRef = useRef();
//   const [doorRotations, setDoorRotations] = useState({}); // Keep track of door rotation

//   // Function to handle door rotation
//   const rotateDoor = (doorId) => {
//     setDoorRotations((prevRotations) => ({
//       ...prevRotations,
//       [doorId]: (prevRotations[doorId] || 0) + Math.PI / 2, // Rotate 90 degrees
//     }));
//   };

//   // Calculate the center of the house layout for the OrbitControls target
//   const houseCenterX = houseWidth / 2;
//   const houseCenterY = houseHeight / 2;

//   return (
//     <div className="room3d-container" style={{ height: '100vh' }}>
//       <Canvas>
//         {/* Lighting */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[10, 10, 5]} intensity={1} />

//         {/* Render the fixed floor */}
//         <Box args={[houseWidth, houseHeight, 0.1]} position={[houseCenterX, houseCenterY, -0.05]}>
//           <meshStandardMaterial attach="material" map={floorTexture} />
//         </Box>

//         {/* Group the rooms so only they rotate */}
//         <group ref={roomGroupRef}>
//           {rooms.map((room, index) => (
//             <group key={room.id}>
//               {/* Room walls */}
//               <Box
//                 args={[room.width, room.height, 3]} // Width, height, depth of the room (3D wall height)
//                 position={[room.left + room.width / 2, room.top + room.height / 2, 1.5]} // Center above floor
//               >
//                 <meshStandardMaterial attach="material" map={wallTexture} />
//               </Box>

//               {/* Room floor */}
//               <Box
//                 args={[room.width, room.height, 0.1]} // Flat floor
//                 position={[room.left + room.width / 2, room.top + room.height / 2, 0]} // Place it at the bottom
//               >
//                 <meshStandardMaterial attach="material" map={floorTexture} />
//               </Box>

//               {/* Room ceiling with different textures */}
//               <Box
//                 args={[room.width, room.height, 0.1]} // Flat ceiling
//                 position={[room.left + room.width / 2, room.top + room.height / 2, 3]} // Place at the top of the room
//               >
//                 <meshStandardMaterial attach="material" map={ceilingTextures[index % ceilingTextures.length]} />
//               </Box>

//               {/* Doors */}
//               {room.doors.map((door) => {
//                 const doorRotation = doorRotations[door.id] || 0; // Get current rotation for the door
//                 let doorPosition = [0, 0, 0]; // Default door position
//                 let doorArgs = [door.width, door.height, 0.1]; // Default door size (width, height, depth)

//                 // Calculate door position based on 'position' property (left, right, top, bottom)
//                 switch (door.position) {
//                   case 'left':
//                     doorPosition = [room.left, room.top + room.height / 2, 1.5]; // left wall, middle
//                     doorArgs = [0.1, door.height, 0.1]; // Narrower door for wall
//                     break;
//                   case 'right':
//                     doorPosition = [room.left + room.width, room.top + room.height / 2, 1.5]; // right wall, middle
//                     doorArgs = [0.1, door.height, 0.1];
//                     break;
//                   case 'top':
//                     doorPosition = [room.left + room.width / 2, room.top, 1.5]; // top wall, middle
//                     doorArgs = [door.width, 0.1, 0.1]; // Narrower door for top/bottom
//                     break;
//                   case 'bottom':
//                     doorPosition = [room.left + room.width / 2, room.top + room.height, 1.5]; // bottom wall, middle
//                     doorArgs = [door.width, 0.1, 0.1];
//                     break;
//                   default:
//                     break;
//                 }

//                 return (
//                   <group key={door.id} position={doorPosition}>
//                     {/* Rotating door */}
//                     <Box
//                       args={doorArgs}
//                       rotation={[0, 0, doorRotation]} // Apply rotation to the door
//                       onClick={() => rotateDoor(door.id)} // Rotate door on click
//                     >
//                       <meshStandardMaterial attach="material" color="brown" />
//                     </Box>
//                   </group>
//                 );
//               })}
//             </group>
//           ))}
//         </group>

//         {/* OrbitControls centered on the middle of the house layout */}
//         <OrbitControls
//           target={[houseCenterX, houseCenterY, 1.5]} // Focus on the center of the rooms
//           enableZoom={true} // Allow zoom
//           autoRotate={false} // Disable automatic rotation
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default Room3D;




import React, { useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Room3D = ({ houseWidth, houseHeight, rooms }) => {
  // Load textures for walls, floor, and ceiling
  const wallTexture = useLoader(THREE.TextureLoader, '/textures/wall.jpg');
  const floorTexture = useLoader(THREE.TextureLoader, '/textures/floor.jpg');
  const ceilingTextures = [
    useLoader(THREE.TextureLoader, '/textures/ceiling.jpg'),
    useLoader(THREE.TextureLoader, '/textures/ceiling2.jpg'),
    useLoader(THREE.TextureLoader, '/textures/ceiling3.jpg'),
  ];

  // Calculate center of the house layout
  const houseCenterX = houseWidth / 2;
  const houseCenterY = houseHeight / 2;

  return (
    <div className="room3d-container" style={{ height: '100vh' }}>
      <Canvas>
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />

        {/* Render the fixed floor */}
        <Box args={[houseWidth, houseHeight, 0.1]} position={[houseCenterX, houseCenterY, -0.05]}>
          <meshStandardMaterial attach="material" map={floorTexture} />
        </Box>

        {/* Group the rooms so only they rotate */}
        <group>
          {rooms.map((room) => (
            <group key={room.id}>
              {/* Room walls */}
              <Box
                args={[room.width, room.height, 3]} // Width, height, depth of the room (3D wall height)
                position={[room.left + room.width / 2, room.top + room.height / 2, 1.5]} // Center above floor
              >
                <meshStandardMaterial attach="material" map={wallTexture} />
              </Box>

              {/* Room floor */}
              <Box
                args={[room.width, room.height, 0.1]} // Flat floor
                position={[room.left + room.width / 2, room.top + room.height / 2, 0]} // Place it at the bottom
              >
                <meshStandardMaterial attach="material" map={floorTexture} />
              </Box>

              {/* Room ceiling with different textures */}
              <Box
                args={[room.width, room.height, 0.1]} // Flat ceiling
                position={[room.left + room.width / 2, room.top + room.height / 2, 3]} // Place at the top of the room
              >
                <meshStandardMaterial attach="material" map={ceilingTextures[room.id % ceilingTextures.length]} />
              </Box>

              {/* Doors */}
              {room.doors.map((door) => (
                <group
                  key={door.id}
                  position={[
                    door.position === 'left' ? room.left : door.position === 'right' ? room.left + room.width : room.left + room.width / 2,
                    door.position === 'top' ? room.top : door.position === 'bottom' ? room.top + room.height : room.top + room.height / 2,
                    1.5
                  ]}
                >
                  <Box
                    args={door.position === 'top' || door.position === 'bottom' ? [door.width, 0.1, 0.1] : [0.1, door.height, 0.1]}
                    rotation={[0, 0, door.position === 'top' ? Math.PI / 2 : 0]}
                  >
                    <meshStandardMaterial attach="material" color="brown" />
                  </Box>
                </group>
              ))}
            </group>
          ))}
        </group>

        {/* OrbitControls */}
        <OrbitControls
          target={[houseCenterX, houseCenterY, 1.5]} // Focus on the center of the house
          enableZoom={true} // Allow zoom
          autoRotate={false} // Disable automatic rotation
        />
      </Canvas>
    </div>
  );
};

export default Room3D;

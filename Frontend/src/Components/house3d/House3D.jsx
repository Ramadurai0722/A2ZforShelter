// import React, { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Room from "./Room";
// import wallTexture from "./3dModels/Bricks092_2K-JPG/Bricks092_2K-JPG_Color.jpg";
// import doorTexture from "./3dModels/Door001_4K-JPG/Door001.png";
// import floorTexture from "./3dModels/Tatami004_2K-JPG/Tatami004_2K-JPG_Displacement.jpg";
// import "./House3D.css"; // Import the CSS file for styling
// import Staircase from "./Staircase";


// const House3D = ({ landWidth, landLength }) => {
//   // Lighting settings
//   const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.7);
//   const [directionalLightIntensity, setDirectionalLightIntensity] = useState(0.9);
//   const [pointLightIntensity, setPointLightIntensity] = useState(0.5);
//   const [spotLightIntensity, setSpotLightIntensity] = useState(0.8);

//   // Room configurations
//   const initialRooms = {
//     hall: { width: 6, height: 1, depth: 6, position: [-7, 0.5, 2.5], interior: 'wall' },
//     bedroom: { width: 6, height: 1, depth: 4, position: [4, 1, -2], interior: 'bed' },
//     bathroom: { width: 3, height: 1, depth: 2, position: [5.5, 1, -1], interior: 'wardrobe' },
//     kitchen: { width: 5, height: 2, depth: 3, position: [-7, 0.5, -2], interior: 'fridge' },
//     livingRoom: { width: 12, height: 2, depth: 5, position: [2, -0.5, 2.5], interior: 'wall' },
//     diningRoom: { width: 5.5, height: 1, depth: 4, position: [-1.7, 1, -2], interior: 'wardrobe' },
//   };

//   const [rooms, setRooms] = useState(initialRooms);

//   const handleRemoveRoom = (room) => {
//     const { [room]: removedRoom, ...remainingRooms } = rooms;
//     setRooms(remainingRooms);
//   };

//   const handleWidthChange = (room, value) => {
//     setRooms((prevRooms) => ({
//       ...prevRooms,
//       [room]: { ...prevRooms[room], width: parseFloat(value) },
//     }));
//   };

//   const handleHeightChange = (room, value) => {
//     setRooms((prevRooms) => ({
//       ...prevRooms,
//       [room]: { ...prevRooms[room], height: parseFloat(value) },
//     }));
//   };

//   const handlePositionChange = (room, index, value) => {
//     const updatedPosition = [...rooms[room].position];
//     updatedPosition[index] = parseFloat(value);
//     setRooms((prevRooms) => ({
//       ...prevRooms,
//       [room]: { ...prevRooms[room], position: updatedPosition },
//     }));
//   };

//   const handleInteriorChange = (room, value) => {
//     setRooms((prevRooms) => ({
//       ...prevRooms,
//       [room]: { ...prevRooms[room], interior: value },
//     }));
//   };

//   const textures = {
//     wall: wallTexture,
//     door: doorTexture,
//     floor: floorTexture,
//   };

//   return (
//     <div className="house3d-container">
//       <Canvas
//         camera={{
//           position: [5, 10, 20],
//           fov: 45,
//           near: 0.1,
//           far: 100,
//         }}
//       >
//         <ambientLight intensity={ambientLightIntensity} />
//         <directionalLight position={[2, 5, 2]} intensity={directionalLightIntensity} />
//         <pointLight position={[0, 10, 0]} intensity={pointLightIntensity} distance={30} />
//         <spotLight position={[10, 20, 10]} intensity={spotLightIntensity} angle={0.3} penumbra={0.5} />
//         <OrbitControls />

//         {/* Render Rooms */}
//         {Object.keys(rooms).map((room) => (
//           <Room
//             key={room}
//             width={rooms[room].width}
//             height={rooms[room].height}
//             depth={rooms[room].depth}
//             position={rooms[room].position}
//             textures={textures}
//             roomName={room}
//             interior={rooms[room].interior} // Pass the selected interior to the Room component
//           />
//         ))}

//         {/* Land */}
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
//           <planeGeometry args={[landWidth, landLength]} />
//           <meshStandardMaterial color="green" />
//         </mesh>
//       </Canvas>

//       {/* Lighting Control Panel */}
//       <div className="lighting-controls">
//         <h3>Lighting Controls</h3>
//         <label>
//           Ambient Light Intensity:
//           <input
//             type="range"
//             min="0"
//             max="1"
//             step="0.1"
//             value={ambientLightIntensity}
//             onChange={(e) => setAmbientLightIntensity(parseFloat(e.target.value))}
//           />
//         </label>
//         <label>
//           Directional Light Intensity:
//           <input
//             type="range"
//             min="0"
//             max="2"
//             step="0.1"
//             value={directionalLightIntensity}
//             onChange={(e) => setDirectionalLightIntensity(parseFloat(e.target.value))}
//           />
//         </label>
//         <label>
//           Point Light Intensity:
//           <input
//             type="range"
//             min="0"
//             max="2"
//             step="0.1"
//             value={pointLightIntensity}
//             onChange={(e) => setPointLightIntensity(parseFloat(e.target.value))}
//           />
//         </label>
//         <label>
//           Spot Light Intensity:
//           <input
//             type="range"
//             min="0"
//             max="2"
//             step="0.1"
//             value={spotLightIntensity}
//             onChange={(e) => setSpotLightIntensity(parseFloat(e.target.value))}
//           />
//         </label>
//       </div>

//       {/* Position and Interior Control Panel */}
//       <div className="position-controls">
//         {Object.keys(rooms).map((room) => (
//           <div key={room}>
//             <h4>{room}</h4>
//             <label>
//               Width:
//               <input
//                 type="number"
//                 value={rooms[room].width}
//                 onChange={(e) => handleWidthChange(room, e.target.value)}
//               />
//             </label>
//             <label>
//               Height:
//               <input
//                 type="number"
//                 value={rooms[room].height}
//                 onChange={(e) => handleHeightChange(room, e.target.value)}
//               />
//             </label>
//             <label>
//               Position X:
//               <input
//                 type="number"
//                 value={rooms[room].position[0]}
//                 onChange={(e) => handlePositionChange(room, 0, e.target.value)}
//               />
//             </label>
//             <label>
//               Position Y:
//               <input
//                 type="number"
//                 value={rooms[room].position[1]}
//                 onChange={(e) => handlePositionChange(room, 1, e.target.value)}
//               />
//             </label>
//             <label>
//               Position Z:
//               <input
//                 type="number"
//                 value={rooms[room].position[2]}
//                 onChange={(e) => handlePositionChange(room, 2, e.target.value)}
//               />
//             </label>

//             {/* Interior Selection */}
//             <label>
//               Select Interior:
//               <select
//                 value={rooms[room].interior}
//                 onChange={(e) => handleInteriorChange(room, e.target.value)}
//               >
//                 <option value="wall">Wall</option>
//                 <option value="bed">Bed</option>
//                 <option value="wardrobe">Wardrobe</option>
//                 <option value="fridge">Fridge</option>
//               </select>
//             </label>
//             <Staircase/>
//             <button onClick={() => handleRemoveRoom(room)}>Remove</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default House3D;








// import React, { useState } from "react";
// import { Canvas } from "@react-three/fiber";
// import Staircase from "./Staircase"; // Ensure to have Staircase component in the same folder

// const House3D = ({ landWidth, landLength }) => {
//   // State for staircase dimensions
//   const [staircaseSteps, setStaircaseSteps] = useState(5);
//   const [staircaseWidth, setStaircaseWidth] = useState(1);
//   const [staircaseHeight, setStaircaseHeight] = useState(0.5);

//   return (
//     <div className="house3d-container" style={{ height: '100vh' }}>
//       {/* Staircase Input Form */}
//       <div className="staircase-controls" style={{ padding: '20px', background: '#f0f0f0' }}>
//         <h3>Staircase Controls</h3>
//         <label>
//           Number of Steps:
//           <input
//             type="number"
//             value={staircaseSteps}
//             onChange={(e) => setStaircaseSteps(parseInt(e.target.value))}
//             min="1"
//           />
//         </label>
//         <label>
//           Step Width:
//           <input
//             type="number"
//             value={staircaseWidth}
//             onChange={(e) => setStaircaseWidth(parseFloat(e.target.value))}
//             step="0.1"
//           />
//         </label>
//         <label>
//           Step Height:
//           <input
//             type="number"
//             value={staircaseHeight}
//             onChange={(e) => setStaircaseHeight(parseFloat(e.target.value))}
//             step="0.1"
//           />
//         </label>
//       </div>

//       <Canvas style={{ height: '80vh' }}>
//         {/* Background color */}
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} intensity={1} />

//         {/* Render Staircase */}
//         <Staircase
//           steps={staircaseSteps}
//           width={staircaseWidth}
//           height={staircaseHeight}
//           position={[0, 0, 0]} // Adjust as needed
//         />
//       </Canvas>
//     </div>
//   );
// };

// export default House3D;







import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Staircase from "./Staircase"; // Ensure to have Staircase component in the same folder
import Room from "./Room"; // Ensure to have Room component in the same folder
import wallTexture from "./3dModels/Bricks092_2K-JPG/Bricks092_2K-JPG_Color.jpg";
import doorTexture from "./3dModels/Door001_4K-JPG/Door001.png";
import floorTexture from "./3dModels/Tatami004_2K-JPG/Tatami004_2K-JPG_Displacement.jpg";
import "./House3D.css"; // Import the CSS file for styling

const House3D = ({ landWidth, landLength }) => {
  // State for staircase dimensions
  const [staircaseSteps, setStaircaseSteps] = useState(5);
  const [staircaseWidth, setStaircaseWidth] = useState(1);
  const [staircaseHeight, setStaircaseHeight] = useState(0.5);

  // Lighting settings
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.7);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(0.9);
  const [pointLightIntensity, setPointLightIntensity] = useState(0.5);
  const [spotLightIntensity, setSpotLightIntensity] = useState(0.8);

  // Room configurations
  const initialRooms = {
    hall: { width: 6, height: 1, depth: 6, position: [-7, 0.5, 2.5], interior: 'wall' },
    bedroom: { width: 6, height: 1, depth: 4, position: [4, 1, -2], interior: 'bed' },
    bathroom: { width: 3, height: 1, depth: 2, position: [5.5, 1, -1], interior: 'wardrobe' },
    kitchen: { width: 5, height: 2, depth: 3, position: [-7, 0.5, -2], interior: 'fridge' },
    livingRoom: { width: 12, height: 2, depth: 5, position: [2, -0.5, 2.5], interior: 'wall' },
    diningRoom: { width: 5.5, height: 1, depth: 4, position: [-1.7, 1, -2], interior: 'wardrobe' },
  };

  const [rooms, setRooms] = useState(initialRooms);

  const handleRemoveRoom = (room) => {
    const { [room]: removedRoom, ...remainingRooms } = rooms;
    setRooms(remainingRooms);
  };

  const handleWidthChange = (room, value) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: { ...prevRooms[room], width: parseFloat(value) },
    }));
  };

  const handleHeightChange = (room, value) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: { ...prevRooms[room], height: parseFloat(value) },
    }));
  };

  const handlePositionChange = (room, index, value) => {
    const updatedPosition = [...rooms[room].position];
    updatedPosition[index] = parseFloat(value);
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: { ...prevRooms[room], position: updatedPosition },
    }));
  };

  const handleInteriorChange = (room, value) => {
    setRooms((prevRooms) => ({
      ...prevRooms,
      [room]: { ...prevRooms[room], interior: value },
    }));
  };

  const textures = {
    wall: wallTexture,
    door: doorTexture,
    floor: floorTexture,
  };

  return (
    <div className="house3d-container" style={{ height: '100vh' }}>
      {/* Staircase Input Form */}
      <div className="staircase-controls" style={{ padding: '20px', background: '#f0f0f0' }}>
        <h3>Staircase Controls</h3>
        <label>
          Number of Steps:
          <input
            type="number"
            value={staircaseSteps}
            onChange={(e) => setStaircaseSteps(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          Step Width:
          <input
            type="number"
            value={staircaseWidth}
            onChange={(e) => setStaircaseWidth(parseFloat(e.target.value))}
            step="0.1"
          />
        </label>
        <label>
          Step Height:
          <input
            type="number"
            value={staircaseHeight}
            onChange={(e) => setStaircaseHeight(parseFloat(e.target.value))}
            step="0.1"
          />
        </label>
      </div>

      <Canvas style={{ height: '80vh' }} camera={{ position: [5, 10, 20], fov: 45, near: 0.1, far: 100 }}>
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight position={[2, 5, 2]} intensity={directionalLightIntensity} />
        <pointLight position={[0, 10, 0]} intensity={pointLightIntensity} distance={30} />
        <spotLight position={[10, 20, 10]} intensity={spotLightIntensity} angle={0.3} penumbra={0.5} />
        <OrbitControls />

        {/* Render Rooms */}
        {Object.keys(rooms).map((room) => (
          <Room
            key={room}
            width={rooms[room].width}
            height={rooms[room].height}
            depth={rooms[room].depth}
            position={rooms[room].position}
            textures={textures}
            roomName={room}
            interior={rooms[room].interior}
          />
        ))}

        {/* Land */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[landWidth, landLength]} />
          <meshStandardMaterial color="green" />
        </mesh>

        {/* Render Staircase */}
        <Staircase
          steps={staircaseSteps}
          width={staircaseWidth}
          height={staircaseHeight}
          position={[0, 0, 0]} // Adjust as needed
        />
      </Canvas>

      {/* Lighting Control Panel */}
      <div className="lighting-controls">
        <h3>Lighting Controls</h3>
        <label>
          Ambient Light Intensity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={ambientLightIntensity}
            onChange={(e) => setAmbientLightIntensity(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Directional Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={directionalLightIntensity}
            onChange={(e) => setDirectionalLightIntensity(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Point Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pointLightIntensity}
            onChange={(e) => setPointLightIntensity(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Spot Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={spotLightIntensity}
            onChange={(e) => setSpotLightIntensity(parseFloat(e.target.value))}
          />
        </label>
      </div>

      {/* Position and Interior Control Panel */}
      <div className="position-controls">
        {Object.keys(rooms).map((room) => (
          <div key={room}>
            <h4>{room}</h4>
            <label>
              Width:
              <input
                type="number"
                value={rooms[room].width}
                onChange={(e) => handleWidthChange(room, e.target.value)}
              />
            </label>
            <label>
              Height:
              <input
                type="number"
                value={rooms[room].height}
                onChange={(e) => handleHeightChange(room, e.target.value)}
              />
            </label>
            <label>
              Position X:
              <input
                type="number"
                value={rooms[room].position[0]}
                onChange={(e) => handlePositionChange(room, 0, e.target.value)}
              />
            </label>
            <label>
              Position Y:
              <input
                type="number"
                value={rooms[room].position[1]}
                onChange={(e) => handlePositionChange(room, 1, e.target.value)}
              />
            </label>
            <label>
              Position Z:
              <input
                type="number"
                value={rooms[room].position[2]}
                onChange={(e) => handlePositionChange(room, 2, e.target.value)}
              />
            </label>
            <label>
              Interior Type:
              <select
                value={rooms[room].interior}
                onChange={(e) => handleInteriorChange(room, e.target.value)}
              >
                <option value="wall">Wall</option>
                <option value="door">Door</option>
                <option value="floor">Floor</option>
                {/* Add more interior options as needed */}
              </select>
            </label>
            <button onClick={() => handleRemoveRoom(room)}>Remove Room</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default House3D;

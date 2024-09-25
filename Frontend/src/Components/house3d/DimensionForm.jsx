// import React, { useState } from "react";

// const DimensionForm = ({ onSubmit }) => {
//   const [landWidth, setLandWidth] = useState(10);
//   const [landLength, setLandLength] = useState(10);
//   const [rooms, setRooms] = useState({
//     hall: { width: 3, height: 2.5, depth: 4, door: { width: 1, height: 2 } },
//     bedroom: { width: 3, height: 2.5, depth: 3, door: { width: 1, height: 2 } },
//     bathroom: {
//       width: 2,
//       height: 2.5,
//       depth: 2,
//       door: { width: 0.8, height: 2 },
//     },
//     kitchen: { width: 3, height: 2.5, depth: 3, door: { width: 1, height: 2 } },
//     livingRoom: {
//       width: 5,
//       height: 2.5,
//       depth: 4,
//       door: { width: 1, height: 2 },
//     },
//     diningRoom: {
//       width: 4,
//       height: 2.5,
//       depth: 3,
//       door: { width: 1, height: 2 },
//     },
//     garage: { width: 4, height: 2.5, depth: 5, door: { width: 2, height: 2 } },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     const [room, dimension] = name.split(".");
//     setRooms({
//       ...rooms,
//       [room]: {
//         ...rooms[room],
//         [dimension]: parseFloat(value),
//       },
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ landWidth, landLength, rooms });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Land Width:</label>
//         <input
//           type="number"
//           value={landWidth}
//           onChange={(e) => setLandWidth(parseFloat(e.target.value))}
//         />
//       </div>
//       <div>
//         <label>Land Length:</label>
//         <input
//           type="number"
//           value={landLength}
//           onChange={(e) => setLandLength(parseFloat(e.target.value))}
//         />
//       </div>
//       <div>
//         <h3>Rooms:</h3>
//         {Object.keys(rooms).map((room) => (
//           <div key={room}>
//             <h4>{room.charAt(0).toUpperCase() + room.slice(1)}</h4>
//             <label>Width:</label>
//             <input
//               type="number"
//               name={`${room}.width`}
//               value={rooms[room].width}
//               onChange={handleInputChange}
//             />
//             <label>Height:</label>
//             <input
//               type="number"
//               name={`${room}.height`}
//               value={rooms[room].height}
//               onChange={handleInputChange}
//             />
//             <label>Depth:</label>
//             <input
//               type="number"
//               name={`${room}.depth`}
//               value={rooms[room].depth}
//               onChange={handleInputChange}
//             />
//             <label>Door Width:</label>
//             <input
//               type="number"
//               name={`${room}.door.width`}
//               value={rooms[room].door.width}
//               onChange={handleInputChange}
//             />
//             <label>Door Height:</label>
//             <input
//               type="number"
//               name={`${room}.door.height`}
//               value={rooms[room].door.height}
//               onChange={handleInputChange}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="submit">Create 3D Model</button>
//       <button type="submit">Create 2D Model</button>

//     </form>
//   );
// };

// export default DimensionForm;





// import React, { useState } from "react";

// const DimensionForm = ({ onSubmit }) => {
//   const [landWidth, setLandWidth] = useState(20);
//   const [landLength, setLandLength] = useState(10);
//   const [rooms, setRooms] = useState({
//     hall: { width: 3, height: 2.5, depth: 4, door: { width: 1, height: 2 } },
//     bedroom: { width: 3, height: 2.5, depth: 3, door: { width: 1, height: 2 } },
//     bathroom: {
//       width: 2,
//       height: 2.5,
//       depth: 2,
//       door: { width: 0.8, height: 2 },
//     },
//     kitchen: { width: 3, height: 2.5, depth: 3, door: { width: 1, height: 2 } },
//     livingRoom: {
//       width: 5,
//       height: 2.5,
//       depth: 4,
//       door: { width: 1, height: 2 },
//     },
//     diningRoom: {
//       width: 4,
//       height: 2.5,
//       depth: 3,
//       door: { width: 1, height: 2 },
//     },
//     garage: { width: 4, height: 2.5, depth: 5, door: { width: 2, height: 2 } },
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target; 
//     const [room, dimension] = name.split(".");
//     setRooms({
//       ...rooms,
//       [room]: {
//         ...rooms[room],
//         [dimension]: parseFloat(value),
//       },
//     });
//   };

//   const handleSubmit = (e, modelType) => {
//     e.preventDefault();
//     onSubmit({ landWidth, landLength, rooms, modelType }); // Pass the modelType ('2D' or '3D') to the parent
//   };

//   return (
//     <form>
//       <div>
//         <label>Land Width:</label>
//         <input
//           type="number"
//           value={landWidth}
//           onChange={(e) => setLandWidth(parseFloat(e.target.value))}
//         />
//       </div>
//       <div>
//         <label>Land Length:</label>
//         <input
//           type="number"
//           value={landLength}
//           onChange={(e) => setLandLength(parseFloat(e.target.value))}
//         />
//       </div>
//       <div>
//         <h3>Rooms:</h3>
//         {Object.keys(rooms).map((room) => (
//           <div key={room}>
//             <h4>{room.charAt(0).toUpperCase() + room.slice(1)}</h4>
//             <label>Width:</label>
//             <input
//               type="number"
//               name={`${room}.width`}
//               value={rooms[room].width}
//               onChange={handleInputChange}
//             />
//             <label>Height:</label>
//             <input
//               type="number"
//               name={`${room}.height`}
//               value={rooms[room].height}
//               onChange={handleInputChange}
//             />
//             <label>Depth:</label>
//             <input
//               type="number"
//               name={`${room}.depth`}
//               value={rooms[room].depth}
//               onChange={handleInputChange}
//             />
//             <label>Door Width:</label>
//             <input
//               type="number"
//               name={`${room}.door.width`}
//               value={rooms[room].door.width}
//               onChange={handleInputChange}
//             />
//             <label>Door Height:</label>
//             <input
//               type="number"
//               name={`${room}.door.height`}
//               value={rooms[room].door.height}
//               onChange={handleInputChange}
//             />
//           </div>
//         ))}
//       </div>
//       <button type="button" onClick={(e) => handleSubmit(e, '3D')}>
//         Create 3D Model
//       </button>
//       <button type="button" onClick={(e) => handleSubmit(e, '2D')}>
//         Create 2D Model
//       </button>
//     </form>
//   );
// };

// export default DimensionForm;






import React, { useState } from "react";

const DimensionForm = ({ onSubmit }) => {
  const [landWidth, setLandWidth] = useState(20);
  const [landLength, setLandLength] = useState(10);
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "roomName") {
      setRoomName(value);
    } else {
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.name === name ? { ...room, [name]: parseFloat(value) } : room
        )
      );
    }
  };

  const handleAddRoom = () => {
    if (roomName) {
      setRooms([
        ...rooms,
        { name: roomName, width: 3, height: 2.5, depth: 3, door: { width: 1, height: 2 } },
      ]);
      setRoomName("");
    }
  };

  const handleRemoveRoom = (name) => {
    setRooms(rooms.filter((room) => room.name !== name));
  };

  const handleSubmit = (e, modelType) => {
    e.preventDefault();
    onSubmit({ landWidth, landLength, rooms, modelType });
  };

  return (
    <form>
      <div>
        <label>Land Width:</label>
        <input
          type="number"
          value={landWidth}
          onChange={(e) => setLandWidth(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <label>Land Length:</label>
        <input
          type="number"
          value={landLength}
          onChange={(e) => setLandLength(parseFloat(e.target.value))}
        />
      </div>
      <div>
        <h3>Add Room:</h3>
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={handleInputChange}
          placeholder="Room Name"
        />
        <button type="button" onClick={handleAddRoom}>
          Add Room
        </button>
      </div>
      <div>
        <h3>Rooms:</h3>
        {rooms.map((room) => (
          <div key={room.name}>
            <h4>{room.name.charAt(0).toUpperCase() + room.name.slice(1)}</h4>
            <label>Width:</label>
            <input
              type="number"
              name={`${room.name}.width`}
              value={room.width}
              onChange={handleInputChange}
            />
            <label>Height:</label>
            <input
              type="number"
              name={`${room.name}.height`}
              value={room.height}
              onChange={handleInputChange}
            />
            <label>Depth:</label>
            <input
              type="number"
              name={`${room.name}.depth`}
              value={room.depth}
              onChange={handleInputChange}
            />
            <label>Door Width:</label>
            <input
              type="number"
              name={`${room.name}.door.width`}
              value={room.door.width}
              onChange={handleInputChange}
            />
            <label>Door Height:</label>
            <input
              type="number"
              name={`${room.name}.door.height`}
              value={room.door.height}
              onChange={handleInputChange}
            />
            <button type="button" onClick={() => handleRemoveRoom(room.name)}>
              Remove Room
            </button>
          </div>
        ))}
      </div>
      <br />
      <button type="button" onClick={(e) => handleSubmit(e, '3D')}>
        Create 3D Model
      </button>
    </form>
  );
};

export default DimensionForm;

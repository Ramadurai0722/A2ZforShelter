import React, { useContext, useState } from "react";
import { ShapeContext } from "./ShapeContext";

const RoomForm = () => {
  const { addShape } = useContext(ShapeContext);
  const [roomDimensions, setRoomDimensions] = useState({
    width: "",
    length: "",
  });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState("room"); // Should be updated from context or state in your actual app

  const handleSubmit = (e) => {
    e.preventDefault();
    addShape({
      id: Date.now(),
      type: "room",
      width: parseFloat(roomDimensions.width),
      length: parseFloat(roomDimensions.length),
      points: [position.x, position.y],
    });
  };

  return (
    mode === "room" && (
      <form onSubmit={handleSubmit}>
        <label>
          Width:
          <input
            type="number"
            value={roomDimensions.width}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, width: e.target.value })
            }
          />
        </label>
        <label>
          Length:
          <input
            type="number"
            value={roomDimensions.length}
            onChange={(e) =>
              setRoomDimensions({ ...roomDimensions, length: e.target.value })
            }
          />
        </label>
        <label>
          X Position:
          <input
            type="number"
            value={position.x}
            onChange={(e) =>
              setPosition({ ...position, x: parseFloat(e.target.value) })
            }
          />
        </label>
        <label>
          Y Position:
          <input
            type="number"
            value={position.y}
            onChange={(e) =>
              setPosition({ ...position, y: parseFloat(e.target.value) })
            }
          />
        </label>
        <button type="submit">Add Room</button>
      </form>
    )
  );
};

export default RoomForm;

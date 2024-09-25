import React from "react";
import "./House2D.css"; // Import the CSS file for styling

const House2D = ({ landWidth, landLength, rooms }) => {
  return (
    <div className="house2d-container" style={{ width: landWidth, height: landLength }}>
      {/* Render Rooms */}
      {Object.keys(rooms).map((room) => (
        <div
          key={room}
          className="room"
          style={{
            width: rooms[room].width,
            height: rooms[room].height,
            left: `${rooms[room].x}px`,
            top: `${rooms[room].y}px`,
          }}
        >
          {room}
        </div>
      ))}
    </div>
  );
};

export default House2D;

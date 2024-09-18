import React from 'react';
import './Room2D.css';

function Room2D({ houseWidth, houseHeight, rooms }) {
  return (
    <div className="house-container" style={{ width: `${houseWidth}rem`, height: `${houseHeight}rem` }}>
      {rooms.map((room) => {
        const roomArea = room.width * room.height;

        return (
          <div
            key={room.id}
            className="room"
            style={{
              width: `${room.width}rem`,
              height: `${room.height}rem`,
              left: `${room.left}rem`,
              top: `${room.top}rem`,
              border: `${room.wallThickness}rem solid black`,
              position: 'absolute',
            }}
          >
            {/* Display room details in the center */}
            <div className="room-info">
              <strong>{room.name.charAt(0).toUpperCase() + room.name.slice(1)}</strong>
              <p>{`Area: ${roomArea} sq ft`}</p>
              <p>{`W: ${room.width}rem, H: ${room.height}rem`}</p>
            </div>

            {/* Render doors inside the room */}
            {room.doors.map((door) => {
              // Calculate door styles based on position
              let doorStyle = {
                position: 'absolute',
                width: `${door.width}rem`,
                height: `${door.height}rem`,
                backgroundColor: 'brown',
              };

              // Position the door based on its 'position' property
              switch (door.position) {
                case 'left':
                  doorStyle.left = 0;
                  doorStyle.top = `calc(50% - ${door.height / 2}rem)`;
                  break;
                case 'right':
                  doorStyle.right = 0;
                  doorStyle.top = `calc(50% - ${door.height / 2}rem)`;
                  break;
                case 'top':
                  doorStyle.top = 0;
                  doorStyle.left = `calc(50% - ${door.width / 2}rem)`;
                  break;
                case 'bottom':
                  doorStyle.bottom = 0;
                  doorStyle.left = `calc(50% - ${door.width / 2}rem)`;
                  break;
                default:
                  break;
              }

              return (
                <div key={door.id} className="door" style={doorStyle}>
                  Door {door.id}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Room2D;
 





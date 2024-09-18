import React, { useState, useEffect } from 'react';
import Room2D from './Room2D';
// Import your 3D view component
// import Room3D from './Room3D';
import './Assign.css';

function Assign() {
  const [totalHouseArea, setTotalHouseArea] = useState(1200); // Example value
  const [houseWidth, setHouseWidth] = useState(40); // House width in rem
  const [houseHeight, setHouseHeight] = useState(30); // House height in rem
  const [rooms, setRooms] = useState([
    { id: 4, name: 'ktn', width: 5, height: 7, left: 0, top: 0, wallThickness: 0.2, doors: [] },
    { id: 1, name: 'bedroom', width: 8, height: 10, left: 5, top: 0, wallThickness: 0.2, doors: [] },
    { id: 2, name: 'bedroom', width: 8, height: 10, left: 5, top: 10, wallThickness: 0.2, doors: [] },
    { id: 3, name: 'hall area', width: 5, height: 13.3, left: 0, top: 7, wallThickness: 0.2, doors: [] },
    { id: 5, name: 'toilet', width: 5, height: 6, left: 8, top: 14, wallThickness: 0.2, doors: [] },
    { id: 8, name: 'parking', width: 13, height: 5, left: 0, top: 20, wallThickness: 0.2, doors: [] },
  ]);
  const [facingDirection, setFacingDirection] = useState('North');
  const [totalArea, setTotalArea] = useState(0);
  const [remainingArea, setRemainingArea] = useState(0);
  const [viewMode, setViewMode] = useState('2D'); // Track the current view mode

  const handleChange = (index, dimension, value) => {
    setRooms((prev) => {
      const newRooms = [...prev];
      const room = newRooms[index];
      const newValue = parseFloat(value) || 0;

      if (dimension === 'width') {
        if (room.left + newValue > houseWidth) {
          alert("Room width exceeds house boundary");
          return prev;
        }
      } else if (dimension === 'height') {
        if (room.top + newValue > houseHeight) {
          alert("Room height exceeds house boundary");
          return prev;
        }
      }

      newRooms[index] = { ...room, [dimension]: newValue };
      return newRooms;
    });
  };

  const handlePositionChange = (index, position, value) => {
    setRooms((prev) => {
      const newRooms = [...prev];
      const room = newRooms[index];
      const newValue = parseFloat(value) || 0;

      if (position === 'left') {
        if (newValue + room.width > houseWidth) {
          alert("Room exceeds house boundary on the right");
          return prev;
        }
      } else if (position === 'top') {
        if (newValue + room.height > houseHeight) {
          alert("Room exceeds house boundary on the bottom");
          return prev;
        }
      }

      newRooms[index] = { ...room, [position]: newValue };
      return newRooms;
    });
  };

  const handleFacingChange = (event) => {
    setFacingDirection(event.target.value);
  };

  const handleTotalHouseAreaChange = (event) => {
    setTotalHouseArea(parseFloat(event.target.value) || 0);
  };

  const addRoom = (type) => {
    const newRoom = {
      id: rooms.length + 1,
      name: type,
      width: 10,
      height: 8,
      left: 0,
      top: 0,
      wallThickness: 1,
      doors: []
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const addDoor = (roomId) => {
    setRooms((prevRooms) => {
      const newRooms = prevRooms.map((room) => {
        if (room.id === roomId) {
          const newDoor = {
            id: room.doors.length + 1,
            width: 1,
            height: 2,
            position: 'left',
          };
          return { ...room, doors: [...room.doors, newDoor] };
        }
        return room;
      });
      return newRooms;
    });
  };

  const removeDoor = (roomId, doorId) => {
    setRooms((prevRooms) => {
      const newRooms = prevRooms.map((room) => {
        if (room.id === roomId) {
          return { ...room, doors: room.doors.filter((door) => door.id !== doorId) };
        }
        return room;
      });
      return newRooms;
    });
  };

  useEffect(() => {
    const calculatedTotalArea = rooms.reduce((total, room) => total + room.width * room.height, 0);
    setTotalArea(calculatedTotalArea);
    setRemainingArea(totalHouseArea - calculatedTotalArea);
  }, [rooms, totalHouseArea]);

  return (
    <div className="assign-container">
      <div className="total-house-area-input">
        <label htmlFor="totalHouseArea">Enter Total House Area (sq ft): </label>
        <input
          type="number"
          id="totalHouseArea"
          value={totalHouseArea}
          onChange={handleTotalHouseAreaChange}
          placeholder="Total House Area"
        />
      </div>

      <div className="facing-direction-selector">
        <label htmlFor="facingDirection">Select House Facing Direction: </label>
        <select id="facingDirection" value={facingDirection} onChange={handleFacingChange}>
          <option value="North">North</option>
          <option value="East">East</option>
          <option value="South">South</option>
          <option value="West">West</option>
        </select>
      </div>

      <div className="add-room-buttons">
        <button onClick={() => addRoom('bedroom')}>Add Bedroom</button>
        <button onClick={() => addRoom('bathroom')}>Add Bathroom</button>
      </div>

      <div className="room-selector">
        {rooms.map((room, index) => (
          <div key={room.id} className="room-input">
            <h3>{room.name.charAt(0).toUpperCase() + room.name.slice(1)} {index + 1}</h3>
            <label>
              Width (rem):
              <input
                type="number"
                value={room.width}
                onChange={(e) => handleChange(index, 'width', e.target.value)}
                placeholder="Width"
              />
            </label>
            <label>
              Height (rem):
              <input
                type="number"
                value={room.height}
                onChange={(e) => handleChange(index, 'height', e.target.value)}
                placeholder="Height"
              />
            </label>
            <label>
              Left (rem):
              <input
                type="number"
                value={room.left}
                onChange={(e) => handlePositionChange(index, 'left',
                  e.target.value)}
                  placeholder="Left"
                />
              </label>
              <label>
                Top (rem):
                <input
                  type="number"
                  value={room.top}
                  onChange={(e) => handlePositionChange(index, 'top', e.target.value)}
                  placeholder="Top"
                />
              </label>
              <label>
                Wall Thickness (rem):
                <input
                  type="number"
                  value={room.wallThickness}
                  onChange={(e) => handleChange(index, 'wallThickness', e.target.value)}
                  placeholder="Wall Thickness"
                />
              </label>
              <button onClick={() => addDoor(room.id)}>Add Door</button>
              {room.doors.map((door) => (
                <div key={door.id} className="door-input">
                  <h4>Door {door.id}</h4>
                  <label>
                    Width (rem):
                    <input
                      type="number"
                      value={door.width}
                      onChange={(e) => {
                        const newWidth = parseFloat(e.target.value) || 0;
                        setRooms((prevRooms) =>
                          prevRooms.map((r) =>
                            r.id === room.id
                              ? {
                                  ...r,
                                  doors: r.doors.map((d) =>
                                    d.id === door.id ? { ...d, width: newWidth } : d
                                  ),
                                }
                              : r
                          )
                        );
                      }}
                      placeholder="Width"
                    />
                  </label>
                  <label>
                    Height (rem):
                    <input
                      type="number"
                      value={door.height}
                      onChange={(e) => {
                        const newHeight = parseFloat(e.target.value) || 0;
                        setRooms((prevRooms) =>
                          prevRooms.map((r) =>
                            r.id === room.id
                              ? {
                                  ...r,
                                  doors: r.doors.map((d) =>
                                    d.id === door.id ? { ...d, height: newHeight } : d
                                  ),
                                }
                              : r
                          )
                        );
                      }}
                      placeholder="Height"
                    />
                  </label>
                  <label>
                    Position:
                    <select
                      value={door.position}
                      onChange={(e) => {
                        const newPosition = e.target.value;
                        setRooms((prevRooms) =>
                          prevRooms.map((r) =>
                            r.id === room.id
                              ? {
                                  ...r,
                                  doors: r.doors.map((d) =>
                                    d.id === door.id ? { ...d, position: newPosition } : d
                                  ),
                                }
                              : r
                          )
                        );
                      }}
                    >
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                    </select>
                  </label>
                  <button onClick={() => removeDoor(room.id, door.id)}>Remove Door</button>
                </div>
              ))}
              <button className="remove-room-button" onClick={() => removeRoom(room.id)}>Remove Room</button>
            </div>
          ))}
        </div>
  
        <div className="view-toggle-buttons">
          <button onClick={() => setViewMode('2D')}>2D View</button>
          <button onClick={() => setViewMode('3D')}>3D View</button>
        </div>
  
        {viewMode === '2D' ? (
          <Room2D
            houseWidth={houseWidth}
            houseHeight={houseHeight}
            rooms={rooms}
            facingDirection={facingDirection}
          />
        ) : (
          <Room3D
            houseWidth={houseWidth}
            houseHeight={houseHeight}
            rooms={rooms}
            facingDirection={facingDirection}
          />
        )}
  
        <div className="summary">
          <p><strong>Total Area:</strong> {totalArea} sq ft</p>
          <p><strong>Remaining Area:</strong> {remainingArea} sq ft</p>
        </div>
      </div>
    );
  }
  
  export default Assign;
  
// Assigns.js
import React, { useState, useEffect } from 'react';
import Room3D from './Room3D';
import './Assign.css';

function Assigns() {
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
  const [viewMode, setViewMode] = useState('3D'); // Only 3D view mode

  return (
    <div className="assign-container">
      {/* Your existing form and controls */}
      
      {viewMode === '3D' && (
        <Room3D
          houseWidth={houseWidth}
          houseHeight={houseHeight}
          rooms={rooms}
        />
      )}
    </div>
  );
}

export default Assigns;

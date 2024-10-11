import React, { useState, useEffect } from 'react';
import './floorplan.css';
import doorImg from '/media/door.png';
import windowImg from '/media/window.webp';
import sofaImg from '/media/sofa.png';
import bedImg from '/media/bed.png';
import toiletImg from '/media/toilet.png';
import diningTableImg from '/media/dining.png';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const FloorPlanGenerator = () => {
    const [roomData, setRoomData] = useState([]);
    const [dimensions, setDimensions] = useState({
        totalSquareFeet: 1150,
        builtUpArea: 1100,
        carpetArea: 50,
    });

    // Room configurations based on built-up area ranges
    const roomConfigurations = {
        '350-450': [
            { name: 'Entrance', width: 9, length: 3, x: 18, y: 11, doors: [], windows: [], furniture: [] },
            { name: 'Hall', width: 9, length: 6, x: 18, y: 14, doors: [{ x: 20, y: 12.6, width: 2, height: 4, rotation: 180.4 }], windows: [], furniture: [{ type: 'sofa', x: 16.7, y: 16, width: 4, height: 4, rotation: 0 }] },
            { name: 'Bed Room', width: 7, length: 6, x: 14, y: 20, doors: [{ x: 18.9, y: 18.7, width: 2, height: 4, rotation: 180.4 }], windows: [{ x: 18.3, y: 24.4, width: 2, height: 2 }], furniture: [{ type: 'bed', x: 14.2, y: 23.3, width: 3, height: 3, rotation: 269.4 }] },
            { name: 'Bath', width: 4, length: 3, x: 14, y: 17, doors: [{ x: 16.5, y: 16, width: 1.5, height: 7, rotation: 0 }], windows: [], furniture: [{ type: 'toilet', x: 13.5, y: 16.7, width: 2, height: 2, rotation: 270 }] },
            { name: 'Kitchen', width: 3, length: 6, x: 27, y: 14, doors: [{ x: 25.3, y: 16.9, width: 2, height: 4, rotation: 269.8 }], windows: [{ x: 27.5, y: 12.5, width: 2, height: 2 }], furniture: [] },
            { name: 'Dining Area', width: 7, length: 6, x: 21, y: 20, doors: [{ x: 21, y: 18.7, width: 2, height: 4, rotation: 180.4 }], windows: [{ x: 21, y: 24.4, width: 2, height: 2 }], furniture: [{ type: 'dining_table', x: 23, y: 21.5, width: 4, height: 4, rotation: 0 }] },
            { name: 'Pooja Room', width: 4, length: 3, x: 14, y: 14, doors: [], windows: [], furniture: [] },    
        ],
        '450-550': [
            { name: 'Entrance', width: 10, length: 3, x: 18, y: 7, doors: [], windows: [], furniture: [] },
            { name: 'Hall', width: 11, length: 10, x: 17, y: 10, doors: [{ x: 19, y: 8.7, width: 2, height: 4, rotation: 180.4 }], windows: [], furniture: [{ type: 'sofa', x: 15.7, y: 15, width: 4, height: 4, rotation: 0 }] },
            { name: 'Bed Room', width: 10, length: 8, x: 14, y: 20, doors: [{ x: 21.9, y: 18.7, width: 2, height: 4, rotation: 180.4 }], windows: [{ x: 18.3, y: 26.3, width: 2, height: 2 }], furniture: [{ type: 'bed', x: 14, y: 25.3, width: 3, height: 3, rotation: 269.4 }] },
            { name: 'Bath', width: 5, length: 5, x: 12, y: 15, doors: [{ x: 15.3, y: 16, width: 1.5, height: 7, rotation: 0 }], windows: [], furniture: [{ type: 'toilet', x: 11.5, y: 14.7, width: 2, height: 2, rotation: 270 }] },
            { name: 'Kitchen', width: 5, length: 9, x: 28, y: 11, doors: [{ x: 26.3, y: 16.4, width: 2, height: 4, rotation: 269.8 }], windows: [{ x: 29.5, y:9.4, width: 2, height: 2 }], furniture: [] },
            { name: 'Dining Area', width: 9, length: 7, x: 24, y: 20, doors: [{ x: 24, y: 18.7, width: 2, height: 4, rotation: 180.4 }], windows: [{ x: 24.3, y: 25.4, width: 2, height: 2 }], furniture: [{ type: 'dining_table', x: 27, y: 22.5, width: 4, height: 4, rotation: 0 }] },
            { name: 'Pooja Room', width: 5, length: 5, x: 12, y: 10, doors: [], windows: [], furniture: [] },
        ],
        // '680 - 780':[
        //     { name: 'Entrance', width: 20, length: 5, x: 10 , y: 2, doors: [], windows: [], furniture: [] },
        //     { name: 'Hall', width: 13, length: 10, x: 19, y: 7, doors: [{ x: 26, y: 4.5, width: 2.8, height: 7, rotation: 180.4 }], windows: [{ x: 30, y: 5.4, width: 2, height: 2,rotation: 90}], furniture: [{ type: 'sofa', x: 28, y: 11.3, width: 6, height: 6, rotation: 0 }] },
        //     { name: 'Bed Room 1', width: 11, length: 10, x: 8, y: 7, doors: [{ x: 16.8, y: 7, width: 2.5, height: 7, rotation: 269.8 }], windows: [], furniture: [{ type: 'bed', x: 8, y: 12, width: 4, height: 4, rotation: 0}] },
        //     { name: 'Bath 1', width: 6, length: 3, x: 8, y: 7, doors: [{ x: 8, y: 7, width: 1.5, height: 7, rotation: 180.5 }], windows: [], furniture: [{ type: 'toilet', x: 8, y: 6.5, width: 2, height: 2, rotation: 0 }] },
        //     { name: 'Bath 2', width: 6, length: 3, x: 8, y: 17, doors: [{ x: 8, y: 17, width: 1.5, height: 7, rotation: 180.5 }], windows: [], furniture: [{ type: 'toilet', x: 8, y: 16.5, width: 2, height: 2, rotation: 0 }] },
        //     { name: 'Bed Room 2', width: 11, length: 11, x: 8, y: 17, doors: [{ x: 16.8, y: 15.3, width: 2.5, height: 7, rotation: 269.4 }], windows: [{ x: 10, y: 26.4, width: 2, height: 2, rotation: 180.4 }], furniture: [{ type: 'bed', x: 8, y: 22, width: 4, height: 4, rotation: 180 }] },
        //     { name: 'Kitchen', width: 7, length: 11, x: 25, y: 17, doors: [{ x: 23, y: 16, width: 2.5, height: 7, rotation: 269.4 }], windows: [], furniture: [] },
        //     { name: 'Dining Area', width: 6, length: 11, x: 19, y: 17, doors: [{ x: 21, y: 14.5, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 27, y: 26.4, width: 2, height: 2 }], furniture: [{ type: 'dining_table', x: 20, y: 23, width: 4, height: 4, rotation: 0 }] },
        // ],
        '750-850': [
            { name: 'Entrance', width: 14, length: 5, x: 13, y: 3, doors: [], windows: [], furniture: [] },
            { name: 'Hall', width: 10, length: 10, x: 18, y: 8, doors: [{ x: 24, y: 5.3, width: 2.5, height: 7, rotation: 180.4 }], windows: [], furniture: [{ type: 'sofa', x: 16.5, y: 8, width: 6, height: 6, rotation: 0 }] },
            { name: 'Bed Room 1', width: 11, length: 10, x: 7, y: 8, doors: [{ x: 15.9, y: 12, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 8, y: 6.4, width: 2, height: 2 }], furniture: [{ type: 'bed', x: 14, y: 8, width: 4, height: 4, rotation: 360.4 }] },
            { name: 'Bath 1', width: 5, length: 5, x: 7, y: 18, doors: [{ x: 10.3, y: 15, width: 1.5, height: 7, rotation: 180.5 }], windows: [], furniture: [{ type: 'toilet', x: 6.5, y: 20.5, width: 2, height: 2, rotation: 270 }] },
            { name: 'Bath 2', width: 5, length: 5, x: 7, y: 23, doors: [{ x: 10.5, y: 23, width: 1.5, height: 7, rotation: 269.8 }], windows: [], furniture: [{ type: 'toilet', x: 6.5, y: 26.5, width: 2, height: 2, rotation: 270 }] },
            { name: 'Bed Room 2', width: 11, length: 10, x: 12, y: 18, doors: [{ x: 18, y: 15.3, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 17, y: 26.4, width: 2, height: 2, rotation: 180.4 }], furniture: [{ type: 'bed', x: 19, y: 24, width: 4, height: 4, rotation: 180 }] },
            { name: 'Kitchen', width: 5, length: 10, x: 28, y: 8, doors: [{ x: 25.5, y: 13, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 30, y: 6.4, width: 2, height: 2 }], furniture: [] },
            { name: 'Dining Area', width: 10, length: 9, x: 23, y: 18, doors: [{ x: 23, y: 15.4, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 31, y: 25.4, width: 2, height: 2}], furniture: [{ type: 'dining_table', x: 26, y: 23, width: 4, height: 4, rotation: 0 }] },
        ],
        '850-950': [
            { name: 'Entrance', width: 15, length: 5, x: 18, y: 5, doors: [], windows: [], furniture: [] },
        { name: 'Hall', width: 14, length: 10, x: 19, y: 10, doors: [{ x: 24, y: 7.4, width: 2.5, height: 7, rotation: 180.4 }], windows: [], furniture: [{ type: 'sofa', x: 17, y: 13, width: 6, height: 6, rotation: 0 }] },
        { name: 'Bed Room 1', width: 11, length: 10, x: 8, y: 10, doors: [{ x: 16.9, y: 8.5, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 13, y: 8.4, width: 2, height: 2 }], furniture: [{ type: 'bed', x: 8, y: 9.5, width: 4, height: 4, rotation: 269.4 }] },
        { name: 'Bath 1', width: 6, length: 6, x: 8, y: 20, doors: [{ x: 9, y: 17, width: 1.5, height: 7, rotation: 180.5 }], windows: [], furniture: [{ type: 'toilet', x: 7.5, y: 24, width: 2, height: 2, rotation: 270 }] },
        { name: 'Bath 2', width: 6, length: 5, x: 8, y: 26, doors: [{ x: 12.7, y: 23.5, width: 1.5, height: 7, rotation: 269.9 }], windows: [], furniture: [{ type: 'toilet', x: 7.5, y: 29, width: 2, height: 2, rotation: 270 }] },
        { name: 'Bed Room 2', width: 12, length: 11, x: 14, y: 20, doors: [{ x:19, y: 17.3, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 15, y: 29.3, width: 2, height: 2, rotation: 180.4 }], furniture: [{ type: 'bed', x: 22.4, y: 27, width: 4, height: 4, rotation: 180 }] },
        { name: 'Kitchen', width: 5, length: 10, x: 33, y: 10, doors: [{ x: 30.9, y: 13.9, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 33.5, y: 8.5, width: 2, height: 2 }], furniture: [] },
        { name: 'Dining Area', width: 12, length: 10, x: 26, y: 20, doors: [{ x: 26, y: 17.4, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 27, y: 28.4, width: 2, height: 2 }], furniture: [{ type: 'dining_table', x: 30, y: 24.5, width: 4, height: 4, rotation: 0 }] },
        ],
        '950-1250': [
            { name: 'Entrance', width: 14, length: 4, x: 18, y: 2, doors: [], windows: [], furniture: [] },
            { name: 'Hall', width: 14, length: 11, x: 18, y: 6, doors: [{ x: 28, y: 3.4, width: 2.5, height: 7, rotation: 180.4 }], windows: [], furniture: [{ type: 'sofa', x: 16, y: 10, width: 6, height: 6, rotation: 0 }] },
            { name: 'Bed Room 1', width: 12, length: 11, x: 6, y: 6, doors: [{ x: 15.9, y: 4, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 14, y: 4.4, width: 2, height: 2 }], furniture: [{ type: 'bed', x: 6, y: 5.5, width: 4, height: 4, rotation: 269.4 }] },
            { name: 'Bath 1', width: 7, length: 6, x: 8, y: 17, doors: [{ x: 8, y: 14, width: 1.5, height: 7, rotation: 180.5 }], windows: [], furniture: [{ type: 'toilet', x: 7.5, y: 21, width: 2, height: 2, rotation: 270 }] },
            { name: 'Bath 2', width: 7, length: 6, x: 8, y: 23, doors: [{ x: 13.7, y: 20.5, width: 1.5, height: 7, rotation: 269.9 }], windows: [], furniture: [{ type: 'toilet', x: 7.5, y: 23, width: 2, height: 2, rotation: 270 }] },
            { name: 'Bed Room 2', width: 12, length: 12, x: 15, y: 17, doors: [{ x:18.3, y: 14.3, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 15, y: 27.3, width: 2, height: 2, rotation: 180.4 }], furniture: [{ type: 'bed', x: 23.4, y: 25, width: 4, height: 4, rotation: 180 }] },
            { name: 'Kitchen', width: 7, length: 11, x: 32, y: 6, doors: [{ x: 29.9, y: 11.9, width: 2.5, height: 7, rotation: 269.8 }], windows: [{ x: 33, y: 4.5, width: 2, height: 2 }], furniture: [] },
            { name: 'Dining Area', width: 12, length: 12, x: 27, y: 17, doors: [{ x: 27, y: 14.4, width: 2.5, height: 7, rotation: 180.4 }], windows: [{ x: 27.5, y: 27.4, width: 2, height: 2 }], furniture: [{ type: 'dining_table', x: 31, y: 20.5, width: 5, height: 5, rotation: 0 }] },
        ],
    };


    const [isSubmitted, setIsSubmitted] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (dimensions.builtUpArea >= 350 && dimensions.builtUpArea < 450) {
            setRoomData(roomConfigurations['350-450']);
        } else if (dimensions.builtUpArea >= 450 && dimensions.builtUpArea < 550) {
            setRoomData(roomConfigurations['450-550']);

        // } else if (dimensions.builtUpArea >= 680 && dimensions.builtUpArea < 780) {
        //     setRoomData(roomConfigurations['680-780']);

        } else if (dimensions.builtUpArea >= 750 && dimensions.builtUpArea < 850) {
            setRoomData(roomConfigurations['750-850']);
        } else if (dimensions.builtUpArea >= 850 && dimensions.builtUpArea < 950) {
            setRoomData(roomConfigurations['850-950']);
        } else if (dimensions.builtUpArea >= 950 && dimensions.builtUpArea < 1250) {
            setRoomData(roomConfigurations['950-1250']);
        }
    }, [dimensions.builtUpArea]);

    useEffect(() => {
        const carpetArea = (dimensions.totalSquareFeet * 0.1);
        setDimensions(prev => ({
            ...prev,
            carpetArea,
        }));
    }, [dimensions.totalSquareFeet]);

    const handleDimensionChange = (field, value) => {
        if (field === 'builtUpArea' && value > dimensions.totalSquareFeet) {
            alert("Built-up area cannot exceed total square feet!");
            return;
        }

        if (field === 'carpetArea' && value > dimensions.builtUpArea) {
            alert("Carpet area cannot exceed built-up area!");
            return;
        }

        setDimensions(prevDimensions => ({
            ...prevDimensions,
            [field]: value,
            carpetArea: field === 'carpetArea' ? value : prevDimensions.totalSquareFeet - value,
        }));
    };

    const handleRoomChange = (index, field, value) => {
        const updatedRooms = [...roomData];
        const room = updatedRooms[index];

        const oldPosition = { x: room.x, y: room.y };
        room[field] = value;

        if (field === 'x' || field === 'y') {
            const deltaX = field === 'x' ? value - oldPosition.x : 0;
            const deltaY = field === 'y' ? value - oldPosition.y : 0;

            room.doors = room.doors.map(door => ({
                ...door,
                x: door.x + deltaX,
                y: door.y + deltaY,
            }));

            room.windows = room.windows.map(window => ({
                ...window,
                x: window.x + deltaX,
                y: window.y + deltaY,
            }));

            room.furniture = room.furniture.map(item => ({
                ...item,
                x: item.x + deltaX,
                y: item.y + deltaY,
            }));
        }

        setRoomData(updatedRooms);
    };

    const handleRemoveRoom = (index) => {
        const updatedRooms = roomData.filter((_, i) => i !== index);
        setRoomData(updatedRooms);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    const handleMouseDown = (e, item) => {
        e.preventDefault();
        setSelectedItem(item);
        setIsDragging(true);
        setRotation(item.rotation);
    };

    const handleMouseMove = (e) => {
        if (isDragging && selectedItem) {
            const updatedRooms = [...roomData];
            const roomIndex = updatedRooms.findIndex(room => {
                return room.furniture.includes(selectedItem) || room.doors.includes(selectedItem) || room.windows.includes(selectedItem);
            });

            if (roomIndex !== -1) {
                const room = updatedRooms[roomIndex];
                const newX = (e.clientX - e.target.getBoundingClientRect().left) / roomScale - (room.width / 2);
                const newY = (e.clientY - e.target.getBoundingClientRect().top) / roomScale - (room.length / 2);

                const deltaX = newX - room.x * roomScale;
                const deltaY = newY - room.y * roomScale;

                room.x += deltaX / roomScale;
                room.y += deltaY / roomScale;

                room.doors.forEach(door => {
                    door.x += deltaX / roomScale;
                    door.y += deltaY / roomScale;
                });

                room.windows.forEach(window => {
                    window.x += deltaX / roomScale;
                    window.y += deltaY / roomScale;
                });

                room.furniture.forEach(item => {
                    item.x += deltaX / roomScale;
                    item.y += deltaY / roomScale;
                });

                setRoomData(updatedRooms);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Delete' && selectedItem) {
            const updatedRooms = roomData.map(room => {
                return {
                    ...room,
                    furniture: room.furniture.filter(item => item !== selectedItem),
                    doors: room.doors.filter(item => item !== selectedItem),
                    windows: room.windows.filter(item => item !== selectedItem),
                };
            });
            setRoomData(updatedRooms);
            setSelectedItem(null);
        } else if (e.key === 'ArrowLeft' && selectedItem) {
            setRotation(rotation - 15);
        } else if (e.key === 'ArrowRight' && selectedItem) {
            setRotation(rotation + 15);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedItem, rotation]);

    const roomScale = 20;
    const totalAreaWidth = 250;  
    const totalAreaHeight = 230;

    const builtUpAreaWidth = Math.sqrt(dimensions.builtUpArea * (totalAreaWidth / totalAreaHeight));
    const builtUpAreaHeight = builtUpAreaWidth * (totalAreaHeight / totalAreaWidth);

    return (
        <>
        <Navbar />
        <div className="floor-plan-generator" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <h1>Floor Plan Generator</h1>
            <div className="main-container">
                {!isSubmitted ? (
                    <div className="room-dimensions-container">
                        <h2>Floor Plan Dimensions</h2>
                        <label htmlFor="totalSquareFeet">Total Square Feet:</label>
                        <input
                            type="number"
                            id="totalSquareFeet"
                            value={dimensions.totalSquareFeet}
                            onChange={(e) => handleDimensionChange('totalSquareFeet', parseInt(e.target.value))}
                        />
                        <label htmlFor="builtUpArea">Built-Up Area:</label>
                        <input
                            type="number"
                            id="builtUpArea"
                            value={dimensions.builtUpArea}
                            onChange={(e) => handleDimensionChange('builtUpArea', parseInt(e.target.value))}
                        />
                        <label htmlFor="carpetArea">Carpet Area:</label>
                        <input
                            type="number"
                            id="carpetArea"
                            value={dimensions.carpetArea}
                            onChange={(e) => handleDimensionChange('carpetArea', parseInt(e.target.value))}
                        />
                        <div className="generate-button-container">
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                ) : (
                    <div className="summary-container">
                        <div className="room-dimensions-container">
                            <h2>Total Dimensions</h2>
                            <div className="dimension-summary">
                                <div><strong>Total Square Feet:</strong> {dimensions.totalSquareFeet}</div>
                                <div><strong>Built-Up Area:</strong> {dimensions.builtUpArea}</div>
                                <div><strong>Carpet Area:</strong> {dimensions.carpetArea}</div>
                            </div>
                            <h2>Room Dimensions</h2>
                            <div className="room-cards">
                                {roomData.map((room, index) => (
                                    <div key={index} className="room-card">
                                        <h3>{room.name}</h3>
                                        <div>
                                            <label>Width:</label>
                                            <input
                                                type="number"
                                                value={room.width}
                                                onChange={(e) => handleRoomChange(index, 'width', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label>Length:</label>
                                            <input
                                                type="number"
                                                value={room.length}
                                                onChange={(e) => handleRoomChange(index, 'length', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label>Position X (Top):</label>
                                            <input
                                                type="number"
                                                value={room.x}
                                                onChange={(e) => handleRoomChange(index, 'x', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <div>
                                            <label>Position Y (Left):</label>
                                            <input
                                                type="number"
                                                value={room.y}
                                                onChange={(e) => handleRoomChange(index, 'y', parseInt(e.target.value))}
                                            />
                                        </div>
                                        <button className='remove' onClick={() => handleRemoveRoom(index)}>Remove</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="floor-plan">

                            <svg width="900" height="700">
                                <rect x={0} y={0} width={900} height={700} fill="lightblue" stroke="none" />
                                <rect
                                    x={(900 - builtUpAreaWidth * roomScale) / 2}
                                    y={(700 - builtUpAreaHeight * roomScale) / 2}
                                    width={builtUpAreaWidth * roomScale}
                                    height={builtUpAreaHeight * roomScale}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth="3"
                                />
                                {roomData.map((room, index) => (
                                    <g key={index}>
                                        <rect
                                            x={room.x * roomScale}
                                            y={room.y * roomScale}
                                            width={room.width * roomScale}
                                            height={room.length * roomScale}
                                            fill="none"
                                            stroke="black"
                                            strokeWidth="3"
                                        />
                                        <text
                                            x={(room.x + room.width / 1.9) * roomScale}
                                            y={(room.y + room.length / 5) * roomScale}
                                            textAnchor="middle"
                                            fontSize="10"
                                            fill="black"
                                        >
                                            {room.name}
                                        </text>
                                        <text
                                            x={(room.x + room.width / 1.9) * roomScale}
                                            y={(room.y + room.length / 5) * roomScale + 15}
                                            textAnchor="middle"
                                            fontSize="12"
                                            fill="black"
                                        >
                                            {room.width} x {room.length}
                                        </text>
                                        {room.doors.map((door, doorIndex) => (
                                            <g key={doorIndex}>
                                                <image
                                                    href={doorImg}
                                                    x={door.x * roomScale}
                                                    y={door.y * roomScale}
                                                    width={door.width * roomScale}
                                                    height={door.height * roomScale}
                                                    transform={`rotate(${door.rotation} ${(door.x + door.width / 2) * roomScale} ${(door.y + door.height / 2) * roomScale})`}
                                                    className="door-image"
                                                    onMouseDown={(e) => handleMouseDown(e, door)}
                                                />
                                                <text
                                                    x={(door.x + door.width / 2) * roomScale}
                                                    y={(door.y + door.height - 2.9) * roomScale}
                                                    textAnchor="middle"
                                                    fontSize="10"
                                                    fill="black"
                                                >
                                                    {door.width} ft
                                                </text>
                                            </g>
                                        ))}
                                        {room.windows.map((window, windowIndex) => (
                                            <g key={windowIndex}>
                                                <image
                                                    href={windowImg}
                                                    x={window.x * roomScale}
                                                    y={window.y * roomScale}
                                                    width={window.width * roomScale}
                                                    height={window.height * roomScale}
                                                    onMouseDown={(e) => handleMouseDown(e, window)}
                                                />
                                                <text
                                                    x={(window.x + window.width / 2) * roomScale}
                                                    y={(window.y + window.height - 1.8) * roomScale}
                                                    textAnchor="middle"
                                                    fontSize="10"
                                                    fill="black"
                                                >
                                                    {window.width} ft
                                                </text>
                                            </g>
                                        ))}
                                        {room.furniture.map((item, furnitureIndex) => {
                                            let imgSrc;
                                            switch (item.type) {
                                                case 'sofa':
                                                    imgSrc = sofaImg;
                                                    break;
                                                case 'bed':
                                                    imgSrc = bedImg;
                                                    break;
                                                case 'toilet':
                                                    imgSrc = toiletImg;
                                                    break;
                                                case 'dining_table':
                                                    imgSrc = diningTableImg;
                                                    break;
                                                default:
                                                    return null;
                                            }
                                            return (
                                                <g key={furnitureIndex}>
                                                    <image
                                                        href={imgSrc}
                                                        x={item.x * roomScale}
                                                        y={item.y * roomScale}
                                                        width={item.width * roomScale}
                                                        height={item.height * roomScale}
                                                        transform={`rotate(${item.rotation} ${item.x * roomScale + (item.width * roomScale) / 2} ${item.y * roomScale + (item.height * roomScale) / 2})`}
                                                        onMouseDown={(e) => handleMouseDown(e, item)}
                                                    />
                                                </g>
                                            );
                                        })}
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <Footer />
        </>
    );
};

export default FloorPlanGenerator;

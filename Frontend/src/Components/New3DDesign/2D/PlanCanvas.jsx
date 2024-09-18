import React, { useContext, useState } from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
import { ShapeContext } from "../ShapeContext";

const GRID_SIZE = 50;

const PlanCanvas = () => {
  const { shapes, addShape } = useContext(ShapeContext);
  const [currentLine, setCurrentLine] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [mode, setMode] = useState("draw");

  const snapToGrid = (value, gridSize) =>
    Math.round(value / gridSize) * gridSize;

  const handleMouseDown = (e) => {
    if (mode === "draw") {
      if (!drawing) {
        setDrawing(true);
        const snappedX = snapToGrid(e.evt.layerX, GRID_SIZE);
        const snappedY = snapToGrid(e.evt.layerY, GRID_SIZE);
        setCurrentLine({
          id: shapes.length + 1,
          points: [snappedX, snappedY, snappedX, snappedY],
          stroke: "black",
          strokeWidth: 2,
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    if (drawing && currentLine) {
      const snappedX = snapToGrid(e.evt.layerX, GRID_SIZE);
      const snappedY = snapToGrid(e.evt.layerY, GRID_SIZE);
      setCurrentLine({
        ...currentLine,
        points: [
          currentLine.points[0],
          currentLine.points[1],
          snappedX,
          snappedY,
        ],
      });
    }
  };

  const handleMouseUp = () => {
    if (drawing && currentLine) {
      addShape({ ...currentLine, type: "line" });
      setCurrentLine(null);
      setDrawing(false);
    }
  };

  return (
    <div>
      <div className="mode-toggle">
        <button
          onClick={() => setMode("draw")}
          className={mode === "draw" ? "active" : ""}
        >
          Draw
        </button>
        <button
          onClick={() => setMode("room")}
          className={mode === "room" ? "active" : ""}
        >
          Room Size
        </button>
      </div>

      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape) =>
            shape.type === "line" ? (
              <Line key={shape.id} {...shape} />
            ) : shape.type === "room" ? (
              <Rect
                key={shape.id}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                stroke="black"
                strokeWidth={2}
              />
            ) : null
          )}
          {currentLine && mode === "draw" && (
            <Line {...currentLine} stroke="blue" />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default PlanCanvas;

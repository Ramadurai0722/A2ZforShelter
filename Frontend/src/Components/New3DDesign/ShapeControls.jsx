import React, { useContext, useState } from "react";
import { ShapeContext } from "./ShapeContext";

const ShapeControls = () => {
  const { shapes, updateShape } = useContext(ShapeContext);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [shapeProps, setShapeProps] = useState({
    x: "",
    y: "",
    width: "",
    height: "",
    elevation: "",
  });

  const handleSelectShape = (e) => {
    const shape = shapes.find(
      (shape) => shape.id === parseInt(e.target.value, 10)
    );
    if (shape) {
      setSelectedShapeId(shape.id);
      setShapeProps({
        x: shape.x || "",
        y: shape.y || "",
        width: shape.width || "",
        height: shape.height || "",
        elevation: shape.elevation || "",
      });
    }
  };

  const handleUpdateShape = () => {
    if (selectedShapeId !== null) {
      updateShape(selectedShapeId, {
        x: parseFloat(shapeProps.x),
        y: parseFloat(shapeProps.y),
        width: parseFloat(shapeProps.width),
        height: parseFloat(shapeProps.height),
        elevation: parseFloat(shapeProps.elevation),
      });
    }
  };

  return (
    <div className="shape-controls">
      <label htmlFor="shape-select" className="control-label">
        Select Shape:
      </label>
      <select
        id="shape-select"
        onChange={handleSelectShape}
        className="shape-select"
      >
        <option value="">--Select--</option>
        {shapes.map((shape) => (
          <option key={shape.id} value={shape.id}>
            Shape {shape.id}
          </option>
        ))}
      </select>

      {selectedShapeId && (
        <div className="shape-properties">
          <label className="property-label">
            X:
            <input
              type="number"
              value={shapeProps.x}
              onChange={(e) =>
                setShapeProps({ ...shapeProps, x: e.target.value })
              }
              className="property-input"
            />
          </label>
          <label className="property-label">
            Y:
            <input
              type="number"
              value={shapeProps.y}
              onChange={(e) =>
                setShapeProps({ ...shapeProps, y: e.target.value })
              }
              className="property-input"
            />
          </label>
          <label className="property-label">
            Width:
            <input
              type="number"
              value={shapeProps.width}
              onChange={(e) =>
                setShapeProps({ ...shapeProps, width: e.target.value })
              }
              className="property-input"
            />
          </label>
          <label className="property-label">
            Height:
            <input
              type="number"
              value={shapeProps.height}
              onChange={(e) =>
                setShapeProps({ ...shapeProps, height: e.target.value })
              }
              className="property-input"
            />
          </label>
          <label className="property-label">
            Elevation:
            <input
              type="number"
              value={shapeProps.elevation}
              onChange={(e) =>
                setShapeProps({ ...shapeProps, elevation: e.target.value })
              }
              className="property-input"
            />
          </label>
          <button onClick={handleUpdateShape} className="update-button">
            Update Shape
          </button>
        </div>
      )}
    </div>
  );
};

export default ShapeControls;

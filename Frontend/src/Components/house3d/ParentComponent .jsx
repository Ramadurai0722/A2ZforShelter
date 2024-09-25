import React, { useState } from "react";
import DimensionForm from "./DimensionForm";
import House2D from "./House2D";
import House3D from "./House3D"; // Assume you have a 3D component

const ParentComponent = () => {
  const [modelData, setModelData] = useState(null);

  const handleModelCreation = ({ landWidth, landLength, rooms, modelType }) => {
    setModelData({ landWidth, landLength, rooms, modelType });
  };

  return (
    <div>
      <DimensionForm onSubmit={handleModelCreation} />
      {modelData && modelData.modelType === "3D" && (
        <House3D
          landWidth={modelData.landWidth}
          landLength={modelData.landLength}
          rooms={modelData.rooms}
        />
      )}
      {modelData && modelData.modelType === "2D" && (
        <House2D
          landWidth={modelData.landWidth}
          landLength={modelData.landLength}
          rooms={modelData.rooms}
        />
      )}
    </div>
  );
};

export default ParentComponent;

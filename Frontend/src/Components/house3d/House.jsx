// House3DView.js
import React, { useState } from "react";
import DimensionForm from "./DimensionForm";
import House3D from "./House3D";

function House3DView() {
  const [config, setConfig] = useState(null);

  return (
    <div className="House3DView">
      <h1>3D House Builder</h1>
      <DimensionForm onSubmit={setConfig} />
      {config && (
        <House3D
          landWidth={config.landWidth}
          landLength={config.landLength}
          rooms={config.rooms}
        />
      )}
    </div>
  );
}

export default House3DView;

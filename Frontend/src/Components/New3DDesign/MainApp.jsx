import React, { useState } from "react";
import PlanCanvas from "./2D/PlanCanvas";
import House3DView from "./3D/House3DView";
import PlanControls from "./2D/PlanControls";
import ShapeControls from "./ShapeControls";
import RoomForm from "./RoomForm";
import { ShapeProvider } from "./ShapeContext";
import "./styles/app.css";

const MainApp = () => {
  const [view, setView] = useState("2D");

  return (
    <ShapeProvider>
      <div className="app-container">
        <div className="view-buttons">
          <button
            className={`view-btn ${view === "2D" ? "active" : ""}`}
            onClick={() => setView("2D")}
          >
            2D View
          </button>
          <button
            className={`view-btn ${view === "3D" ? "active" : ""}`}
            onClick={() => setView("3D")}
          >
            3D View
          </button>
        </div>

        <div className="controls">
          <PlanControls />
          <ShapeControls />
          <RoomForm />
        </div>

        <div className="view-container">
          {view === "2D" ? <PlanCanvas /> : <House3DView />}
        </div>
      </div>
    </ShapeProvider>
  );
};

export default MainApp;

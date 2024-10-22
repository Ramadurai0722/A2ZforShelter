import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./Routes/MainRoutes";
import { SearchProvider } from './Components/Home/Hero/context/searchcontext';
import "./global.css"

function App() {
  return (
    <SearchProvider>
    <Router>
      <MainRoutes />
    </Router>
  </SearchProvider>
  );
}

export default App;

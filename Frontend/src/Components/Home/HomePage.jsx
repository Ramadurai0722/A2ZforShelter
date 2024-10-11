import React from "react";
import { Container } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import HeroSection from "./Hero/HeroSection";
import PropertyGrid from "./PropertyGrid";
import Footer from "../Footer/Footer";
import AgentsSection from "./AgentsSection";
import CategoryHouse from "./House/CategoryHouse";
import CategoryCement from "./Cement/CategoryCement";
import CategoryStone from "./Stone/CategoryStone";
import CategorySand from "./Sand/CategorySand";
import CategoryWood from "./Wood/CategoryWood";
import CategoryPipeWire from "./Pipe&Wire/CategoryPipewire";
import CategorySteel from "./Steel/CategorySteel";
import CategoryInterior from "./Interior/Categoryinterior";
import CategoryCatering from "./Catering/Categorycaterings";
import CategoryPgHostel from "./PgHostel/Categorypgs";

function HomePage() {
  return (
    <>
      <Navbar />
        <HeroSection />
        <PropertyGrid />
        
        <CategoryHouse />
        <CategoryPgHostel />
        <CategoryInterior />
        <CategoryCement />
        <CategoryStone />
        <CategorySand />
        <CategoryWood />
        <CategoryPipeWire />
        <CategorySteel />
        <CategoryCatering />

        <AgentsSection />

      <Footer />
    </>
  );
}

export default HomePage;

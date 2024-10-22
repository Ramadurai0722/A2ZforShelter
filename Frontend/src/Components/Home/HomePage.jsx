import React from "react";
import Navbar from "../Navbar/Navbar";
import HeroSection from "./Hero/HeroSection";
import Footer from "../Footer/Footer";
// import AgentsSection from "./AgenthomeView/AgentsSection";
import CategoryList from "./Categories/category";

function HomePage() {
  return (
    <>
      <Navbar />
        <HeroSection />
        
        <CategoryList />

        {/* <AgentsSection /> */}

      <Footer />
    </>
  );
}

export default HomePage;

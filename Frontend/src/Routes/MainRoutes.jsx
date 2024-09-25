import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home/HomePage";
import LoginRegister from "../Components/Pages/LoginRegister";
import Profile from "../Components/Pages/profile";
// import MapComponent from "../Components/Menu";
// import House3DView from "../Components/HouseBuilding/House";
// import House2D from "../Components/HouseBuilding/House2D";
import SaleProperty from "../Components/SellingDetails/SaleProperty";
import PostHouse from "../Components/SellingDetails/House/PostHouse";
import AdList from "../Components/SellingDetails/House/Houses";
import CementPostForm from "../Components/SellingDetails/Cement/CementPost";
import SandPostForm from "../Components/SellingDetails/Sand/sandpost";
import SteelPostForm from "../Components/SellingDetails/Steel/SteelPost";
import StonePostForm from "../Components/SellingDetails/Stone/StonePost";
import WoodPostForm from "../Components/SellingDetails/Wood/WoodPost";
import CateringpostForm from "../Components/SellingDetails/catering/Cateringpost";
import InteriorpostForm from "../Components/SellingDetails/Interior/Interiorpost";
import Pipe_wires from "../Components/SellingDetails/Pipe&wire/Pipe&wires";
import SellerDashboard from "../Components/SellingDetails/Seller Dashboard/DashBoard";
import Pgpost from "../Components/SellingDetails/PGHostel/PgHostel";
import Agent from "../Components/Agents/Agent";
import AgentDashboard from "../Components/Agents/AgentHome";

import SellerCateringView from "../Components/SellingDetails/SellerViewDetails/CateringDetails";
import SellerPipeWireView from "../Components/SellingDetails/SellerViewDetails/Pipe&wireDeatils";
import SellerPGView from "../Components/SellingDetails/SellerViewDetails/PgDetails";
import SellerHouseView from "../Components/SellingDetails/SellerViewDetails/HouseDetails";
import SellerCementView from "../Components/SellingDetails/SellerViewDetails/CementDetails";
import SellerSandView from "../Components/SellingDetails/SellerViewDetails/SandDetails";
import SellerSteelView from "../Components/SellingDetails/SellerViewDetails/SteelDetails";
import SellerStoneView from "../Components/SellingDetails/SellerViewDetails/StoneDetails";
import SellerWoodView from "../Components/SellingDetails/SellerViewDetails/WoodDetails";

import CategoryHouse from "../Components/Home/CategoryHouse";
import CategoryCement from "../Components/Home/CategoryCement";
import CategoryStone from "../Components/Home/CategoryStone";
import CategorySand from "../Components/Home/CategorySand";
import CategoryWood from "../Components/Home/CategoryWood";
import CategoryPipeWire from "../Components/Home/CategoryPipewire";
import CategorySteel from "../Components/Home/CategorySteel";
import CategoryInterior from "../Components/Home/Categoryinterior";
import CategoryCatering from "../Components/Home/Categorycaterings";
import CategoryPgHostel from "../Components/Home/Categorypgs";

import ProductViewpg from "../Components/Categoryitem/pgview";
import HouseView from "../Components/Categoryitem/houseview";
import CementView from "../Components/Categoryitem/cementview";
import InteriorView from "../Components/Categoryitem/interiorview";
import CateringView from "../Components/Categoryitem/cateringview";
import PipeWireView from "../Components/Categoryitem/pipe&wireview";
import SandView from "../Components/Categoryitem/sandview";
import SteelView from "../Components/Categoryitem/steelview";
import StoneView from "../Components/Categoryitem/stoneview";
import WoodView from "../Components/Categoryitem/woodview";

import CategoryWoodall from "../Components/Categoryitemall/woodcategory";
import CategoryCateringall from "../Components/Categoryitemall/cateringcategory";
import CategoryCementall from "../Components/Categoryitemall/cementcategory";
import CategoryHouseall from "../Components/Categoryitemall/housecategory";
import CategoryInteriorall from "../Components/Categoryitemall/interiorcategory";
import InteriorCategoryPage from "../Components/Categoryitemall/interiorcat";
import CategoryPgHostelall from "../Components/Categoryitemall/pgcategory";
import CategoryPipeWireall from "../Components/Categoryitemall/pipewirecategory";
import CategorySandall from "../Components/Categoryitemall/sandcategory";
import CategorySteelall from "../Components/Categoryitemall/steelcategory";
import CategoryStoneall from "../Components/Categoryitemall/stonecategory";
import SellerInteriorView from "../Components/SellingDetails/SellerViewDetails/InteriorDetails";

//Intrest routes
import SBILoanCalculator from "../Components/LoanCals/sbiloan";
import HDFCLoanCalculator from "../Components/LoanCals/hdfccal";
import KotakLoanCalculator from "../Components/LoanCals/kotakcal";
import LandTLoanCalculator from "../Components/LoanCals/landtcal";
import AxisLoanCalculator from "../Components/LoanCals/axiscal";
import BajajLoanCalculator from "../Components/LoanCals/bajajcal";

// Emi calclulator
import Assign from "../Components/New3DDesign/2D/RoomView";
import Assigns from "../Components/New3DDesign/3D/RoomViewes";
import SbiEmi from "../Components/EMICalc/SbiEmi";
import HdfcEmi from "../Components/EMICalc/HdfcEmi";
import KotakEmi from "../Components/EMICalc/KotakEmi";
import LandTEmi from "../Components/EMICalc/L&Temi";
import AxisEmi from "../Components/EMICalc/AxisEmi";
import BajajEmi from "../Components/EMICalc/BajajEmi";

//favourites
import FavCategories from "../Components/favourites/favdash";
import CateringWithFavourites from "../Components/favourites/Cateringfav";
import CementWithFavourites from "../Components/favourites/Cementfav";
import HouseWithFavourites from "../Components/favourites/housefav";
import InteriorWithFavourites from "../Components/favourites/interiorfav";
import PgHostelWithFavourites from "../Components/favourites/pgfav";
import PipeWireWithFavourites from "../Components/favourites/pipewire";
import SandWithFavourites from "../Components/favourites/sandfav";
import SteelWithFavourites from "../Components/favourites/steelfav";
import StoneWithFavourites from "../Components/favourites/stonefav";
import WoodWithFavourites from "../Components/favourites/woodfav";

// sp

import BoreWell from "../Components/SellingDetails/Borewell/BoreWell";
import CivilEngineer from "../Components/SellingDetails/CivilEnginee/CivilEngineer";
import House3DView from "../Components/house3d/House";


// import Create2D from "../Components/HouseBuilding/2DCreate/2DCreate";
import Loanpost from "../Components/SellingDetails/Loan/Loandealer";
import LandForm from "../Components/SellingDetails/land/land";
import MainApp from "../Components/New3DDesign/MainApp";

// import Main3D from "../Components/New3DDesign/Main3Dand2d";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/profile" element={<Profile />} />

      {/* <Route path="/menu" element={<MapComponent />} /> */}
      {/* <Route path="/2dView" element={<Create2D />} /> */}
      {/* <Route path="/house3d" element={<House3DView />} /> */}
      <Route path="/post" element={<SaleProperty />} />
      <Route path="/posthouse" element={<PostHouse />} />
      <Route path="/pgHostel" element={<Pgpost />} />
      <Route path="/houselist" element={<AdList />} />
      <Route path="/cementpost" element={<CementPostForm />} />
      <Route path="/sandpost" element={<SandPostForm />} />
      <Route path="/steelpost" element={<SteelPostForm />} />
      <Route path="/stonepost" element={<StonePostForm />} />
      <Route path="/woodpost" element={<WoodPostForm />} />
      <Route path="/cateringpost" element={<CateringpostForm />} />
      <Route path="/interiorpost" element={<InteriorpostForm />} />
      <Route path="/Pipe&wires" element={<Pipe_wires />} />
      <Route path="/sellDashBoard" element={<SellerDashboard />} />
      <Route path="/agents" element={<Agent />} />
      <Route path="/agentsList" element={<AgentDashboard />} />

      <Route path="/Loan" element={<Loanpost />} />
      <Route path="/Land" element={<LandForm />}></Route>

      {/* Home page Content */}
      <Route path="/categoryhouse" element={<CategoryHouse />} />
      <Route path="/categorycement" element={<CategoryCement />} />
      <Route path="/categorystone" element={<CategoryStone />} />
      <Route path="/categorysand" element={<CategorySand />} />
      <Route path="/categorywood" element={<CategoryWood />} />
      <Route path="/categorypipewire" element={<CategoryPipeWire />} />
      <Route path="/categorysteel" element={<CategorySteel />} />
      <Route path="/categoryinterior" element={<CategoryInterior />} />
      <Route path="/categorycatering" element={<CategoryCatering />} />
      <Route path="/categorypghostel" element={<CategoryPgHostel />} />

      {/* Buyer Viewdetails */}
      <Route path="/productviewpg/:id" element={<ProductViewpg />} />
      <Route path="/houseview/:id" element={<HouseView />} />
      <Route path="/cementview/:id" element={<CementView />} />
      <Route path="/interiorview/:id" element={<InteriorView />} />
      <Route path="/cateringview/:id" element={<CateringView />} />
      <Route path="/pipe&wireview/:id" element={<PipeWireView />} />
      <Route path="/sandview/:id" element={<SandView />} />
      <Route path="/steelview/:id" element={<SteelView />} />
      <Route path="/stoneview/:id" element={<StoneView />} />
      <Route path="/woodview/:id" element={<WoodView />} />

      {/* Buyer ViewAllItems */}
      <Route path="/woodall" element={<CategoryWoodall />} />
      <Route path="/cateringall" element={<CategoryCateringall />} />
      <Route path="/cementall" element={<CategoryCementall />} />
      <Route path="/houseall" element={<CategoryHouseall />} />
      <Route path="/interiorall" element={<CategoryInteriorall />} />
      <Route path="/interior/:category" element={<InteriorCategoryPage />} />
      <Route path="/pgall" element={<CategoryPgHostelall />} />
      <Route path="/pipewireall" element={<CategoryPipeWireall />} />
      <Route path="/sandall" element={<CategorySandall />} />
      <Route path="/steelall" element={<CategorySteelall />} />
      <Route path="/stoneall" element={<CategoryStoneall />} />

      {/* SellerViewDetails */}
      <Route path="SellerCateringView/:id" element={<SellerCateringView />} />
      <Route path="/SellerPgView/:id" element={<SellerPGView />} />
      <Route path="/Sellerhouseview/:id" element={<SellerHouseView />} />
      <Route path="/Sellerinteriorview/:id" element={<SellerInteriorView />} />
      <Route path="/Sellercementview/:id" element={<SellerCementView />} />
      <Route path="/Sellerpipe&wireview/:id" element={<SellerPipeWireView />} />
      <Route path="/Sellersandview/:id" element={<SellerSandView />} />
      <Route path="/Sellersteelview/:id" element={<SellerSteelView />} />
      <Route path="/Sellerstoneview/:id" element={<SellerStoneView />} />
      <Route path="/Sellerwoodview/:id" element={<SellerWoodView />} />

      {/* intrest route */}
      <Route path="/sbihomeloan" element={<SBILoanCalculator />} />
      <Route path="/hdfchomeloan" element={<HDFCLoanCalculator />} />
      <Route path="/kotakhomeloan" element={<KotakLoanCalculator />} />
      <Route path="/landthomeloan" element={<LandTLoanCalculator />} />
      <Route path="/axishomeloan" element={<AxisLoanCalculator />} />
      <Route path="/bajajhomeloan" element={<BajajLoanCalculator />} />

      {/* Design Route */}

      <Route path="/2dplan" element={<Assign />} />
      <Route path="/3dplan" element={<Assigns />} />

      {/* Emi Route */}
      <Route path="/sbiemi" element={<SbiEmi />} />
      <Route path="/hdfcemi" element={<HdfcEmi />} />
      <Route path="/kotakemi" element={<KotakEmi />} />
      <Route path="/l&temi" element={<LandTEmi />} />
      <Route path="/axisemi" element={<AxisEmi />} />
      <Route path="/bajajemi" element={<BajajEmi />} />

      {/* favourites */}
      <Route path="/favcategory" element={<FavCategories />} />
      <Route path="/favcat" element={<CateringWithFavourites />} />
      <Route path="/favcement" element={<CementWithFavourites />} />
      <Route path="/favhouse" element={<HouseWithFavourites />} />
      <Route path="/favinterior" element={<InteriorWithFavourites />} />
      <Route path="/favpg" element={<PgHostelWithFavourites />} />
      <Route path="/favpipe&wire" element={<PipeWireWithFavourites />} />
      <Route path="/favsand" element={<SandWithFavourites />} />
      <Route path="/favsteel" element={<SteelWithFavourites />} />
      <Route path="/favstone" element={<StoneWithFavourites />} />
      <Route path="/favwood" element={<WoodWithFavourites />} />


      {/* sp */}
      <Route path="/borewell" element={<BoreWell />} />
      <Route path="/civil" element={<CivilEngineer />} />
      <Route path="/home3d" element={<House3DView />} />
      
      {/* ================================================ */}
      <Route path="/Main3D" element={<MainApp />} />
    </Routes>
  );
}

export default MainRoutes;

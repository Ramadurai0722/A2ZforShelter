import React from "react";
import { Routes, Route } from "react-router-dom";

//auth
import Home from "../Components/Home/HomePage";
import LoginRegister from "../Components/Pages/LoginRegister";
import Profile from "../Components/Pages/profile";

// Post Forms
import SaleProperty from "../Components/SellingDetails/SaleProperty";

import PostHouse from "../Components/SellingDetails/House/PostHouse";
import CementPostForm from "../Components/SellingDetails/Cement/CementPost";
import SandPostForm from "../Components/SellingDetails/Sand/sandpost";
import SteelPostForm from "../Components/SellingDetails/Steel/SteelPost";
import StonePostForm from "../Components/SellingDetails/Stone/StonePost";
import WoodPostForm from "../Components/SellingDetails/Wood/WoodPost";
import CateringpostForm from "../Components/SellingDetails/Catering/Cateringpost";
import InteriorpostForm from "../Components/SellingDetails/Interior/Interiorpost";
import Pipe_wires from "../Components/SellingDetails/Pipe&wire/Pipe&wires";
import SellerDashboard from "../Components/SellingDetails/Seller Dashboard/Seller/DashBoard";
import Pgpost from "../Components/SellingDetails/PGHostel/PgHostel";


//Veiw Category Products with id(specific products)
import ProductViewpg from "../Components/Categoryitem/PgView/pgview";
import HouseView from "../Components/Categoryitem/HouseView/houseview";
import CementView from "../Components/Categoryitem/CementView/cementview";
import InteriorView from "../Components/Categoryitem/InteriorView/interiorview";
import CateringView from "../Components/Categoryitem/CateringView/cateringview";
import PipeWireView from "../Components/Categoryitem/PipeWireView/pipe&wireview";
import SandView from "../Components/Categoryitem/SandView/sandview";
import SteelView from "../Components/Categoryitem/SteelView/steelview";
import StoneView from "../Components/Categoryitem/StoneView/stoneview";
import WoodView from "../Components/Categoryitem/WoodView/woodview";

// view all products categorywise
import CategoryWoodall from "../Components/Cat-itemall/WoodAll/woodcategory";
import CategoryCateringall from "../Components/Cat-itemall/CateringAll/cateringcategory";
import CategoryCementall from "../Components/Cat-itemall/CementAll/cementcategory";
import CategoryHouseall from "../Components/Cat-itemall/HouseAll/housecategory";
import CategoryInteriorall from "../Components/Cat-itemall/InteriorAll/interiorcategory";
import InteriorCategoryPage from "../Components/Cat-itemall/InteriorAll/interiorcat";
import CategoryPgHostelall from "../Components/Cat-itemall/PgAll/pgcategory";
import CategoryPipeWireall from "../Components/Cat-itemall/PipeWireAll/pipewirecategory";
import CategorySandall from "../Components/Cat-itemall/SandAll/sandcategory";
import CategorySteelall from "../Components/Cat-itemall/SteelAll/steelcategory";
import CategoryStoneall from "../Components/Cat-itemall/StoneAll/stonecategory";
import SellerInteriorView from "../Components/SellingDetails/SellerViewDetails/Interiorview/InteriorDetails";
import CategoryList from "../Components/Home/Categories/category";

// seller category
import CategoryHouse1 from "../Components/SellingDetails/Seller Dashboard/Houseseller/House";
import CategoryCement1 from "../Components/SellingDetails/Seller Dashboard/Cementseller/Cement";
import CategoryStone1 from "../Components/SellingDetails/Seller Dashboard/Stoneseller/Stone";
import CategorySand1 from "../Components/SellingDetails/Seller Dashboard/Sandseller/Sand";
import CategoryWood1 from "../Components/SellingDetails/Seller Dashboard/Woodseller/Wood";
import CategoryPipeWires1 from "../Components/SellingDetails/Seller Dashboard/PipeWireseller/Pipewires";
import CategorySteel1 from "../Components/SellingDetails/Seller Dashboard/Steelseller/Steel";
import CategoryInterior1 from "../Components/SellingDetails/Seller Dashboard/Interiorseller/Interior";
import CategoryCatering1 from "../Components/SellingDetails/Seller Dashboard/Cateringseller/Catering";
import CategoryPgHostel1 from "../Components/SellingDetails/Seller Dashboard/Pgseller/PGHostel";

//Seller Pages
import SellerCateringView from "../Components/SellingDetails/SellerViewDetails/Cateringview/CateringDetails";
import SellerPipeWireView from "../Components/SellingDetails/SellerViewDetails/PipeWireView/Pipe&wireDeatils";
import SellerPGView from "../Components/SellingDetails/SellerViewDetails/PgView/PgDetails";
import SellerHouseView from "../Components/SellingDetails/SellerViewDetails/Houseview/HouseDetails";
import SellerCementView from "../Components/SellingDetails/SellerViewDetails/CementView/CementDetails";
import SellerSandView from "../Components/SellingDetails/SellerViewDetails/SandView/SandDetails";
import SellerSteelView from "../Components/SellingDetails/SellerViewDetails/SteelView/SteelDetails";
import SellerStoneView from "../Components/SellingDetails/SellerViewDetails/StoneView/StoneDetails";
import SellerWoodView from "../Components/SellingDetails/SellerViewDetails/WoodView/WoodDetails";

// seller category edit
import EditHouseForm from "../Components/SellingDetails/Seller Dashboard/Editcat/houseedit";

//Intrest routes
import SBILoanCalculator from "../Components/LoanCals/sbiloan";
import HDFCLoanCalculator from "../Components/LoanCals/hdfccal";
import KotakLoanCalculator from "../Components/LoanCals/kotakcal";
import LandTLoanCalculator from "../Components/LoanCals/landtcal";
import AxisLoanCalculator from "../Components/LoanCals/axiscal";
import BajajLoanCalculator from "../Components/LoanCals/bajajcal";

// Emi calclulator
import SbiEmi from "../Components/EMICalc/SbiEmi";
import HdfcEmi from "../Components/EMICalc/HdfcEmi";
import KotakEmi from "../Components/EMICalc/KotakEmi";
import LandTEmi from "../Components/EMICalc/L&Temi";
import AxisEmi from "../Components/EMICalc/AxisEmi";
import BajajEmi from "../Components/EMICalc/BajajEmi";

//favourites
import FavCategories from "../Components/favourites/favdash";

// 2d design
import FloorPlanGenerator from "../Components/housebuildrahul/floorplan";

// pricing
import PricingTable from "../Components/pricing/pricingtable";

// loan
import Loanpost from "../Components/SellingDetails/Loan/Loandealer";
import CategoryLoanAll from "../Components/loandeal/loanall";

// land
import LandForm from "../Components/SellingDetails/land/land";
import LandList from "../Components/Landdeal/Land/landall";
import LandView from "../Components/Landdeal/LandView/landviewid";

// agents (ui)
import Agent from "../Components/Agents/Agentform/Agent";
import AgentViewId from "../Components/Agents/AgentVeiw/AgentView";
import AgentSlist from "../Components/Agents/Agentlist/AgentList";

// Borewell
import BoreWell from "../Components/SellingDetails/Borewell/BoreWell";
import BorewellList from "../Components/Borewell/borewellall";

//civil
import CivilEngineer from "../Components/SellingDetails/CivilEnginee/CivilEngineer";
import CivilEngineerList from "../Components/Civil/civilall";

// priya Footer
import Privacy from "../Components/Footer/ContactUs";
import Privacy1 from "../Components/Footer/Privacy";
import TermandCondition from "../Components/Footer/TermandCondition";
import FeedbackForm from "../Components/Footer/Feedback";

// Adds
import AdsCarousel from "../Components/Home/Hero/Adds";
import EditHouse from "../Components/SellingDetails/Seller Dashboard/Editcat/houseedit";
import AboutUs from "../Components/Footer/Aboutus";import Searchresult from "../Components/Home/Hero/Searchresult/searchresult";
import { SearchProvider } from "../Components/Home/Hero/context/searchcontext";



function MainRoutes() {
  return (
    <SearchProvider>
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/Adds" element={<AdsCarousel />} />
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/searchresult' element={<Searchresult />} />

      {/* Post Properties */}
      <Route path="/post" element={<SaleProperty />} />
      <Route path="/posthouse" element={<PostHouse />} />
      <Route path="/pgHostel" element={<Pgpost />} />
      <Route path="/cementpost" element={<CementPostForm />} />
      <Route path="/sandpost" element={<SandPostForm />} />
      <Route path="/steelpost" element={<SteelPostForm />} />
      <Route path="/stonepost" element={<StonePostForm />} />
      <Route path="/woodpost" element={<WoodPostForm />} />
      <Route path="/cateringpost" element={<CateringpostForm />} />
      <Route path="/interiorpost" element={<InteriorpostForm />} />
      <Route path="/Pipe&wires" element={<Pipe_wires />} />
      <Route path="/sellDashBoard" element={<SellerDashboard />} />


      {/* Buyer view product(specific) */}
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

      {/* Buyer ViewAll properties categorywise */}
      <Route path="/woodall" element={<CategoryWoodall />} />
      <Route path="/cateringall" element={<CategoryCateringall />} />
      <Route path="/cementall" element={<CategoryCementall />} />
      <Route path="/houseall" element={<CategoryHouseall />} />
      <Route path="/interiorall" element={<CategoryInteriorall />} />
      <Route path="/interior/:type" element={<InteriorCategoryPage />} />
      <Route path="/pgall" element={<CategoryPgHostelall />} />
      <Route path="/pipewireall" element={<CategoryPipeWireall />} />
      <Route path="/sandall" element={<CategorySandall />} />
      <Route path="/steelall" element={<CategorySteelall />} />
      <Route path="/stoneall" element={<CategoryStoneall />} />
      <Route path="/category" element={<CategoryList />} />

      {/* seller */}

      <Route path="/categoryhouseseller" element={<CategoryHouse1 />} />
      <Route path="/categorycementseller" element={<CategoryCement1 />} />
      <Route path="/categorystoneseller" element={<CategoryStone1 />} />
      <Route path="/categorysandseller" element={<CategorySand1/>} />
      <Route path="/categorywoodseller" element={<CategoryWood1 />} />
      <Route path="/categorypipewireseller" element={<CategoryPipeWires1 />} />
      <Route path="/categorysteelseller" element={<CategorySteel1 />} />
      <Route path="/categoryinteriorseller" element={<CategoryInterior1 />} />
      <Route path="/categorycateringseller" element={<CategoryCatering1 />} />
      <Route path="/categorypghostelseller" element={<CategoryPgHostel1 />} />

      {/* SellerViewDetails */}
      <Route path="/SellerCateringView/:id" element={<SellerCateringView />} />
      <Route path="/SellerPgView/:id" element={<SellerPGView />} />
      <Route path="/Sellerhouseview/:id" element={<SellerHouseView />} />
      <Route path="/Sellerinteriorview/:id" element={<SellerInteriorView />} />
      <Route path="/Sellercementview/:id" element={<SellerCementView />} />
      <Route path="/Sellerpipe&wireview/:id" element={<SellerPipeWireView />} />
      <Route path="/Sellersandview/:id" element={<SellerSandView />} />
      <Route path="/Sellersteelview/:id" element={<SellerSteelView />} />
      <Route path="/Sellerstoneview/:id" element={<SellerStoneView />} />
      <Route path="/Sellerwoodview/:id" element={<SellerWoodView />} />

      {/* seller edit category */}
      <Route path="/editHouse/:id" element={<EditHouse />} />

      {/* intrest route */}
      <Route path="/sbihomeloan" element={<SBILoanCalculator />} />
      <Route path="/hdfchomeloan" element={<HDFCLoanCalculator />} />
      <Route path="/kotakhomeloan" element={<KotakLoanCalculator />} />
      <Route path="/landthomeloan" element={<LandTLoanCalculator />} />
      <Route path="/axishomeloan" element={<AxisLoanCalculator />} />
      <Route path="/bajajhomeloan" element={<BajajLoanCalculator />} />

      {/* Emi Route */}
      <Route path="/sbiemi" element={<SbiEmi />} />
      <Route path="/hdfcemi" element={<HdfcEmi />} />
      <Route path="/kotakemi" element={<KotakEmi />} />
      <Route path="/l&temi" element={<LandTEmi />} />
      <Route path="/axisemi" element={<AxisEmi />} />
      <Route path="/bajajemi" element={<BajajEmi />} />

      {/* favourites */}
      <Route path="/favcategory" element={<FavCategories />} />

      {/* 2d plan */}
      <Route path="/floorplan" element={<FloorPlanGenerator />} />

      {/* pricing */}
      <Route path="/pricetable" element={<PricingTable />} />

      {/* agent ui design*/}
      <Route path="/agents" element={<Agent />} />
      <Route path="/agentsList" element={<AgentSlist />} />
      <Route path="/agents/:id" element={<AgentViewId />} />

      {/* Loan*/}
      <Route path="/Loanpost" element={<Loanpost />} />
      <Route path="/Loanall" element={<CategoryLoanAll />} />

      {/* land */}
      <Route path="/Landpost" element={<LandForm />} />
      <Route path="/Landall" element={<LandList />} />
      <Route path="/landview/:id" element={<LandView />} />

      {/*Borewell*/}
      <Route path="/borewellpost" element={<BoreWell />} />
      <Route path="/borewellall" element={<BorewellList />} />

      {/* civil */}
      <Route path="/civilpost" element={<CivilEngineer />} />
      <Route path="/civilall" element={<CivilEngineerList />} />

      {/* priya */}
      <Route path="/contactus" element={<Privacy />} />
      <Route path="/privacy" element={<Privacy1 />} />
      <Route path="/terms&condition" element={<TermandCondition />} />
      <Route path="/feedback" element={<FeedbackForm />} />
      <Route path="/about" element={<AboutUs />} />
    </Routes>
    </SearchProvider>
  );
}

export default MainRoutes;

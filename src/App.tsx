// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Msme from "./pages/MsmeLoan";
import Mudra from "./pages/MudraLoan";
import HomeLoan from "./pages/HomeLoan";
import Lap from "./pages/LapLoan";
import Personal from "./pages/Personal";
import CreditCards from "./pages/CreditCards";
import AutoLoan from "./pages/AutoLoan";
import MachineryLoan from "./pages/machineryLoan";
import Expert from "./pages/Expert";
import Eligibility from "./pages/Eligibility";
import LearnEarn from "./pages/LearnEarn";
import Insurance from "./pages/Insurance";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import PartnerLogin from "./pages/PartnerLogin";
import Login from "./pages/Login";



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Common header */}
        <Header />

        {/* Main content area (header fixed hai isliye pt-16) */}
        <div className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/msme-loan" element={<Msme />} />
            <Route path="/mudra-loan" element={<Mudra />} />
            <Route path="/home-loan" element={<HomeLoan />} />
            <Route path="/lap-loan" element={<Lap />} />
            <Route path="/personal-loan" element={<Personal />} />
            <Route path="/credit-cards" element={<CreditCards />} />
            <Route path="/auto-loan" element={<AutoLoan />} />
            <Route path="/machinery-loan" element={<MachineryLoan />} />
             <Route path="/expert" element={<Expert />} />
               <Route path="/eligibility" element={<Eligibility />} />
               <Route path="/learn&Earn" element={<LearnEarn />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/partner-login" element={<PartnerLogin />} />
            <Route path="/login" element={<Login />} />

           
          </Routes>
        </div>

        {/* Common footer – har page pe same */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

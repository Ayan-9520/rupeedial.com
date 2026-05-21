// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatBot from "./components/ChatBot";
import LoanMISDashboard from "./components/LoanMISDashboard";
import Newsletter from "./components/Newsletter";
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
import EducationLoan from "./pages/EducationLoan";
import Expert from "./pages/Expert";
import Eligibility from "./pages/CheckEligibility";
import LearnEarn from "./pages/LearnEarn";
import Insurance from "./pages/Insurance";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import BNPLPartnersPage from "./pages/BNPLPartnersPage";
import PartnerLogin from "./pages/PartnerLogin";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/privacy-policy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import LeadForm from "./pages/LeadForm";
import ScrollToTop from "./components/layout/ScrollToTop";

// BLOG PAGES

import BlogProduct from "./pages/blog/BlogProduct";
import BlogPost from "./pages/blog/BlogPost";
import { Navigate } from "react-router-dom";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Common header */}
        <Header />
 <ScrollToTop />
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
             <Route path="/education-loan" element={<EducationLoan />} />
             <Route path="/expert" element={<Expert />} />
               <Route path="/check-eligibility" element={<Eligibility />} />
               <Route path="/learn&Earn" element={<LearnEarn />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/career" element={<Career />} />
            <Route path="/contact" element={<Contact />} />
             <Route path="/partner-login" element={<PartnerLogin />} />
            <Route path="/login" element={<Login />} />
           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
           <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/lead-form" element={<LeadForm />} />
    <Route path="/bnpl-partners" element={<BNPLPartnersPage />} />
{/* ================= BLOG ROUTES ================= */}

{/* BLOG ROUTES */}
<Route path="/blog/post/:slug" element={<BlogPost />} />

<Route path="/blog/:product/:category" element={<BlogProduct />} />
<Route path="/blog/:product" element={<BlogProduct />} />

<Route path="/blog" element={<Navigate to="/blog/auto-loan" replace />} />


<Route path="/mis" element={<LoanMISDashboard />} />

          </Routes>
          
        </div>
<ChatBot />
        {/* Common footer – har page pe same */}
      <div className="mt-8">
  <Newsletter />
</div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

// src/components/home/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#B0E9B2] border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Rupeedial home">
            <img src="/rupeediallogo.png" alt="Rupeedial" className="h-28 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-800">

            <Link to="/" className="text-[[#390A5D]] ">
              Home
            </Link>

           <Link to="/about" className="text-[#10662A] hover:text-[#0D4F20]">
              About
            </Link>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[#10662A] hover:text-[#0D4F20]">
              
                Products
                <span className="mt-[1px] text-[10px]">▼</span>
              </button>

              <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-slate-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">

                <Link to="/msme-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  MSME Loan
                </Link>

                <Link to="/mudra-loan" className="block px-4 py-2 text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Mudra Loan
                </Link>

                 <Link to="/home-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Home Loan
                </Link>

                <Link to="/lap-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Loan Against Property
                </Link>

               <Link to="/personal-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Personal Loan
                </Link>
 <Link to="/credit-cards" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Credit Cards
                </Link>
                <Link to="/auto-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Auto Loan
                </Link>
                
                  <Link to="/machinery-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Machinery Loan
                </Link>
              </div>
            </div>
             
   <Link to="/expert" className="text-[#10662A] hover:text-[#0D4F20]">
            Loan  Expert
            </Link>

            <Link to="/eligibility" className="text-[#10662A] hover:text-[#0D4F20]">
            Check Eligibility
            </Link>
             
<Link to="/learn&earn" className="text-[#10662A] hover:text-[#0D4F20]">
            Learn & Earn
            </Link>

          <Link to="/insurance" className="text-[#10662A] hover:text-[#0D4F20]">
              Insurance
            </Link>

           {/* join us Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-[#10662A] hover:text-[#0D4F20]">
              
                Join Us
                <span className="mt-[1px] text-[10px]">▼</span>
              </button>

              <div className="absolute left-0 mt-2 w-56 rounded-md bg-white shadow-lg border border-slate-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">

                 <Link to="/career" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Career
                </Link>
                   <Link to="/partner-login" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Partner Login
                </Link>
                 
              
              </div>
            </div>
           
          <Link to="/contact" className="text-[#10662A] hover:text-[#0D4F20]">
              Contact Us
            </Link>

           
            <Link
              to="/login"
              className="ml-2 px-4 py-1.5 rounded-md bg-[#B0E9B2] border border-[#10662A] text-[#10662A] text-sm font-semibold hover:bg-white/30 hover:text-[#10662A] transition-colors"
            >
              Login
            </Link>
          </nav>

          {/* Mobile burger button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-9 h-9 border border-slate-300 rounded-md"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="sr-only">Open Menu</span>
            <div className="space-y-1">
              <span className="block w-4 h-[2px] bg-slate-900"></span>
              <span className="block w-4 h-[2px] bg-slate-900"></span>
              <span className="block w-4 h-[2px] bg-slate-900"></span>
            </div>
          </button>

        </div>
      </div>

{/* Mobile menu */}
{mobileOpen && (
  <div className="md:hidden border-t border-slate-200 bg-white">
    <nav className="px-4 py-3 flex flex-col gap-2 text-sm font-medium text-slate-800">

      <Link to="/" className="py-1" onClick={() => setMobileOpen(false)}>
        Home
      </Link>

      <Link to="/about" className="py-1" onClick={() => setMobileOpen(false)}>
        About
      </Link>

      {/* Products dropdown */}
      <details className="py-1">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span>Products</span>
          <span className="text-[10px]">▼</span>
        </summary>

        <div className="mt-1 ml-3 flex flex-col gap-1 text-[13px]">
          <Link to="/msme-loan" onClick={() => setMobileOpen(false)}>MSME Loan</Link>
          <Link to="/mudra-loan" onClick={() => setMobileOpen(false)}>Mudra Loan</Link>
          <Link to="/home-loan" onClick={() => setMobileOpen(false)}>Home Loan</Link>
          <Link to="/lap-loan" onClick={() => setMobileOpen(false)}>Loan Against Property</Link>
          <Link to="/personal-loan" onClick={() => setMobileOpen(false)}>Personal Loan</Link>
          <Link to="/auto-loan" onClick={() => setMobileOpen(false)}>Auto Loan</Link>
          <Link to="/credit-cards" onClick={() => setMobileOpen(false)}>Credit Cards</Link>
        </div>
      </details>

      {/* Loan Expert (ADDED) */}
      <Link to="/expert" className="py-1" onClick={() => setMobileOpen(false)}>
        Loan Expert
      </Link>

      <Link to="/insurance" className="py-1" onClick={() => setMobileOpen(false)}>
        Insurance
      </Link>

      {/* Join Us dropdown (ADDED) */}
      <details className="py-1">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span>Join Us</span>
          <span className="text-[10px]">▼</span>
        </summary>

        <div className="mt-1 ml-3 flex flex-col gap-1 text-[13px]">
          <Link to="/career" onClick={() => setMobileOpen(false)}>Career</Link>
          <Link to="/join-us" onClick={() => setMobileOpen(false)}>Partner Login</Link>
        </div>
      </details>

      <Link to="/contact" className="py-1" onClick={() => setMobileOpen(false)}>
        Contact Us
      </Link>

      <Link
        to="/login"
        className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#AFCC4F] border border-[#AFCC4F] text-black text-sm font-semibold"
        onClick={() => setMobileOpen(false)}
      >
        Login
      </Link>

    </nav>
  </div>
)}

    </header>
  );
};

export default Header;

// src/components/home/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
useEffect(() => {
  if (mobileOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [mobileOpen]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#B0E9B2] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Rupeedial home">
           <img
  src="/rupeediallogo.png"
  alt="Rupeedial"
  className="h-16 md:h-20 w-auto object-contain"
/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-800">
            <Link to="/" className="text-[#390A5D]">
              Home
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
                 <Link to="/auto-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Auto Loan
                </Link>
 <Link to="/credit-cards" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Credit Cards
                </Link>
               
                
                  <Link to="/machinery-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Machinery Loan
                </Link>
                <Link to="/education-loan" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  Education Loan
                </Link>
              </div>
            </div>
               <Link to="/check-eligibility" className="text-[#10662A] hover:text-[#0D4F20]">
            Check Eligibility
            </Link>
   <Link to="/expert" className="text-[#10662A] hover:text-[#0D4F20]">
            Loan  Expert
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
                  Become a Partner
                </Link>
                  <Link to="/bnpl-partners" className="block px-4 py-2  text-[#10662A] hover:text-[#0D4F20] hover:bg-[#B0E9B2]  ">
                  BNPL
                </Link>
                 

              
              </div>
              
            </div>
           <Link to="/blog" className="text-[#10662A] hover:text-[#0D4F20]">
            Blog
            </Link>
   <Link to="/about" className="text-[#10662A] hover:text-[#0D4F20]">
              About
            </Link>
            
          <Link to="/contact" className="text-[#10662A] hover:text-[#0D4F20]">
              Contact Us
            </Link>

           <div className="flex items-center gap-2">

  <Link
    to="/check-eligibility"
    className="px-4 py-1.5 rounded-md bg-[#10662A] text-white text-sm font-semibold hover:bg-[#0D4F20] transition-colors"
  >
    Apply Loan
  </Link>

  <Link
    to="/login"
    className="px-4 py-1.5 bg-[#10662A] rounded-md border border-[#10662A] text-white text-sm font-semibold hover:bg-[#0D4F20]  transition-colors"
  >
    Login
  </Link>

</div>
            
          </nav>

          {/* Mobile burger button */}
          <button
            type="button"
           className="lg:hidden inline-flex items-center justify-center w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
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
  <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white overflow-y-auto">
    <nav className="px-5 py-6 flex flex-col gap-3 text-base font-medium text-slate-800">

      {/* Home */}
      <Link to="/" className="py-2" onClick={() => setMobileOpen(false)}>
        Home
      </Link>

      {/* Products */}
      <details className="py-2">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span>Products</span>
          <span className="text-[10px]">▼</span>
        </summary>

        <div className="mt-2 ml-3 flex flex-col gap-2 text-[14px] text-[#10662A]">
          <Link to="/msme-loan" onClick={() => setMobileOpen(false)}>MSME Loan</Link>
          <Link to="/mudra-loan" onClick={() => setMobileOpen(false)}>Mudra Loan</Link>
          <Link to="/home-loan" onClick={() => setMobileOpen(false)}>Home Loan</Link>
          <Link to="/lap-loan" onClick={() => setMobileOpen(false)}>Loan Against Property</Link>
          <Link to="/personal-loan" onClick={() => setMobileOpen(false)}>Personal Loan</Link>
          <Link to="/auto-loan" onClick={() => setMobileOpen(false)}>Auto Loan</Link>
          <Link to="/credit-cards" onClick={() => setMobileOpen(false)}>Credit Cards</Link>
          <Link to="/machinery-loan" onClick={() => setMobileOpen(false)}>Machinery Loan</Link>
          <Link to="/education-loan" onClick={() => setMobileOpen(false)}>Education Loan</Link>
        </div>
      </details>

      {/* Check Eligibility */}
      <Link to="/check-eligibility" className="py-2" onClick={() => setMobileOpen(false)}>
        Check Eligibility
      </Link>

      {/* Loan Expert */}
      <Link to="/expert" className="py-2" onClick={() => setMobileOpen(false)}>
        Loan Expert
      </Link>

      {/* Learn & Earn */}
      <Link to="/learn&earn" className="py-2" onClick={() => setMobileOpen(false)}>
        Learn & Earn
      </Link>

      {/* Insurance */}
      <Link to="/insurance" className="py-2" onClick={() => setMobileOpen(false)}>
        Insurance
      </Link>

      {/* Join Us */}
      <details className="py-2">
        <summary className="cursor-pointer list-none flex items-center justify-between">
          <span>Join Us</span>
          <span className="text-[10px]">▼</span>
        </summary>

        <div className="mt-2 ml-3 flex flex-col gap-2 text-[14px] text-[#10662A]">
          <Link to="/career" onClick={() => setMobileOpen(false)}>Career</Link>
          <Link to="/partner-login" onClick={() => setMobileOpen(false)}>Become a Partner</Link>
          
        </div>
      </details>

      {/* Blog */}
      <Link to="/blog" className="py-2" onClick={() => setMobileOpen(false)}>
        Blog
      </Link>

      {/* About */}
      <Link to="/about" className="py-2" onClick={() => setMobileOpen(false)}>
        About
      </Link>
 <Link to="/bnpl-partners" className="py-2" onClick={() => setMobileOpen(false)}>
        BNPL
      </Link>
      {/* Contact */}
      <Link to="/contact" className="py-2" onClick={() => setMobileOpen(false)}>
        Contact Us
      </Link>

      {/* CTA Buttons */}
      <div className="flex flex-col gap-3 pt-4">
        <Link
          to="/check-eligibility"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-[#10662A] text-white text-sm font-semibold hover:bg-[#0D4F20] transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          Apply Loan
        </Link>

        <Link
          to="/login"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md border border-[#10662A] text-[#10662A] text-sm font-semibold hover:bg-[#10662A] hover:text-white transition-colors"
          onClick={() => setMobileOpen(false)}
        >
          Login
        </Link>
      </div>

    </nav>
  </div>
)}

    </header>
  );
};

export default Header;

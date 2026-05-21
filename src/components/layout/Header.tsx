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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#B0E9B2]/95 backdrop-blur-xl border-b border-[#cfe7d5] shadow-[0_4px_20px_rgba(16,102,42,0.08)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-[74px]">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Rupeedial home">
           <img
  src="/rupeediallogo.png"
  alt="Rupeedial"
  className="h-14 md:h-[72px] w-auto object-contain transition-all duration-300"
/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-4 text-sm font-medium text-slate-800">
            <Link to="/" className="text-[#390A5D]">
              Home
            </Link>

        

            {/* Products Dropdown */}
            {/* Premium Products Mega Menu */}
<div className="relative group">

  <button
    type="button"
    className="relative inline-flex items-center gap-1 text-[#10662A] hover:text-[#0D4F20] font-semibold transition-all duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300"
  >
    Products
    <span className="text-[10px] mt-[2px]">▼</span>
  </button>

  <div className="absolute left-[-110px] top-full mt-5 w-[920px] rounded-[28px] bg-white/95 backdrop-blur-xl border border-[#d7eadb] shadow-[0_20px_60px_rgba(16,102,42,0.15)] p-8 opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

    <div className="grid grid-cols-4 gap-8">

      {/* Retail Loans */}
      <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
        <h3 className="text-[#10662A] text-[17px] font-bold mb-6 border-b border-[#d8ecdd] pb-3">
          Retail Loans
        </h3>

        <div className="flex flex-col gap-4 text-[14px] text-[#245233] font-medium">

          <Link to="/home-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Home Loan
          </Link>

          <Link to="/personal-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Personal Loan
          </Link>

          <Link to="/auto-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Auto Loan
          </Link>

          <Link to="/education-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Education Loan
          </Link>

          <Link to="/credit-cards" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Credit Cards
          </Link>

          <Link to="/lap-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Loan Against Property
          </Link>

          {/* Insurance moved here */}
          <Link to="/insurance" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Insurance
          </Link>

        </div>
      </div>

      {/* MSME Loans */}
      <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
        <h3 className="text-[#10662A] text-[17px] font-bold mb-6 border-b border-[#d8ecdd] pb-3">
          MSME Loans
        </h3>

        <div className="flex flex-col gap-4 text-[14px] text-[#245233] font-medium">

          <Link to="/msme-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            MSME Loan
          </Link>

          <Link to="/mudra-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Mudra Loan
          </Link>

          <Link to="/machinery-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Machinery Loan
          </Link>

          <Link to="/working-capital-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Working Capital Loan
          </Link>

          <Link to="/business-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Business Loan
          </Link>

          <Link to="/startup-business-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Startup Business Loan
          </Link>

        </div>
      </div>

      {/* Government MSME Loans */}
      <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
        <h3 className="text-[#10662A] text-[17px] font-bold mb-6 border-b border-[#d8ecdd] pb-3">
          Government MSME Loans
        </h3>

        <div className="flex flex-col gap-4 text-[14px] text-[#245233] font-medium">

          <Link to="/cgtmse-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            CGTMSE Loan
          </Link>

          <Link to="/pmegp-loan" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            PMEGP Loan
          </Link>

          <Link to="/standup-india" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Stand-Up India
          </Link>

          <Link to="/subsidy-linked-msme" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Subsidy Linked MSME
          </Link>

        </div>
      </div>

      {/* Trade Finance */}
      <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
        <h3 className="text-[#10662A] text-[17px] font-bold mb-6 border-b border-[#d8ecdd] pb-3">
          Trade Finance
        </h3>

        <div className="flex flex-col gap-4 text-[14px] text-[#245233] font-medium">

          <Link to="/export-finance" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Export Finance
          </Link>

          <Link to="/import-finance" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Import Finance
          </Link>

          <Link to="/lc-bg" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            LC / BG
          </Link>

          <Link to="/invoice-financing" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Invoice Financing
          </Link>

          <Link to="/cash-credit" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Cash Credit (CC)
          </Link>

          <Link to="/overdraft" className="px-3 py-2 rounded-xl hover:bg-[#E8F7EC] hover:text-[#0D4F20] hover:translate-x-1 transition-all duration-200">
            Overdraft (OD)
          </Link>

        </div>
      </div>

    </div>
  </div>
</div>
               <Link to="/check-eligibility" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
            Check Eligibility
            </Link>
   <Link to="/expert" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
            Loan  Expert
            </Link>
 
          
             
<Link to="/learn&earn" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
            Learn & Earn
            </Link>

         
            

           {/* join us Dropdown */}
            {/* Premium Join Us Dropdown */}
<div className="relative group">

  <button
    type="button"
    className="relative inline-flex items-center gap-1 text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300"
  >
    Join Us
    <span className="mt-[1px] text-[10px]">▼</span>
  </button>

  <div className="absolute left-[-120px] top-full mt-5 w-[290px] rounded-[24px] bg-white/95 backdrop-blur-xl border border-[#d7eadb] shadow-[0_20px_60px_rgba(16,102,42,0.15)] p-4 opacity-0 invisible translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">

    <div className="flex flex-col gap-2">

      <Link
        to="/career"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-[#E8F7EC] transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-xl bg-[#dff3e5] flex items-center justify-center text-xl">
          💼
        </div>

        <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
          <h4 className="text-[#10662A] font-semibold text-[14px]">
            Career
          </h4>

          <p className="text-[13px] text-slate-500">
            Explore jobs & opportunities
          </p>
        </div>
      </Link>

      <Link
        to="/partner-login"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-[#E8F7EC] transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-xl bg-[#dff3e5] flex items-center justify-center text-xl">
          🤝
        </div>

        <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
          <h4 className="text-[#10662A] font-semibold text-[14px]">
            Become a Partner
          </h4>

          <p className="text-[13px] text-slate-500">
            Grow with RupeeDial network
          </p>
        </div>
      </Link>

      <Link
        to="/bnpl-partners"
        className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-[#E8F7EC] transition-all duration-200"
      >
        <div className="w-9 h-9 rounded-xl bg-[#dff3e5] flex items-center justify-center text-xl">
          🚀
        </div>

        <div className="rounded-2xl p-2 hover:bg-[#f5fcf7] transition-all duration-300">
          <h4 className="text-[#10662A] font-semibold text-[14px]">
            BNPL
          </h4>

          <p className="text-[13px] text-slate-500">
            Buy now pay later partners
          </p>
        </div>
      </Link>

    </div>
  </div>
</div>
           <Link to="/blog" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
            Blog
            </Link>
   <Link to="/about" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
              About
            </Link>
            
          <Link to="/contact" className="relative text-[#10662A] hover:text-[#0D4F20] transition-all duration-200 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#10662A] after:transition-all after:duration-300">
              Contact Us
            </Link>

           <div className="flex items-center gap-2">

  <Link
    to="/check-eligibility"
    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] shadow-[0_10px_25px_rgba(16,102,42,0.22)] text-white text-sm font-semibold hover:bg-[#0D4F20] transition-colors"
  >
    Apply Loan
  </Link>

  <Link
  to="/login"
  className="px-4 py-2 rounded-xl border border-[#10662A] text-[#10662A] text-sm font-semibold hover:bg-[#10662A] hover:text-white transition-all duration-200"
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
  <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white/95 backdrop-blur-xl overflow-y-auto">
    <nav className="px-5 py-6 flex flex-col gap-3 text-base font-medium text-slate-800">

      {/* Home */}
      <Link to="/" className="py-2" onClick={() => setMobileOpen(false)}>
        Home
      </Link>

      {/* Products */}
  {/* Products */}
<details className="py-2 border-b border-slate-200">

  <summary className="cursor-pointer list-none flex items-center justify-between font-semibold text-[#10662A]">
    <span>Products</span>
    <span className="text-[11px]">▼</span>
  </summary>

  <div className="mt-4 space-y-5">

    {/* Retail */}
    <div className="bg-[#f3fbf5] border border-[#d9ebde] shadow-[0_10px_30px_rgba(16,102,42,0.08)] rounded-xl p-4">
      <h3 className="font-bold text-[#10662A] mb-3">
        Retail Loans
      </h3>

      <div className="flex flex-col gap-3 text-[14px] text-[#10662A]">

        <Link to="/home-loan" onClick={() => setMobileOpen(false)}>Home Loan</Link>

        <Link to="/personal-loan" onClick={() => setMobileOpen(false)}>Personal Loan</Link>

        <Link to="/auto-loan" onClick={() => setMobileOpen(false)}>Auto Loan</Link>

        <Link to="/education-loan" onClick={() => setMobileOpen(false)}>Education Loan</Link>

        <Link to="/credit-cards" onClick={() => setMobileOpen(false)}>Credit Cards</Link>

        <Link to="/lap-loan" onClick={() => setMobileOpen(false)}>Loan Against Property</Link>

        <Link to="/insurance" onClick={() => setMobileOpen(false)}>Insurance</Link>

      </div>
    </div>

    {/* MSME */}
    <div className="bg-[#f3fbf5] border border-[#d9ebde] shadow-[0_10px_30px_rgba(16,102,42,0.08)] rounded-xl p-4">
      <h3 className="font-bold text-[#10662A] mb-3">
        MSME Loans
      </h3>

      <div className="flex flex-col gap-3 text-[14px] text-[#10662A]">

        <Link to="/msme-loan" onClick={() => setMobileOpen(false)}>MSME Loan</Link>

        <Link to="/mudra-loan" onClick={() => setMobileOpen(false)}>Mudra Loan</Link>

        <Link to="/machinery-loan" onClick={() => setMobileOpen(false)}>Machinery Loan</Link>

        <Link to="/working-capital-loan" onClick={() => setMobileOpen(false)}>Working Capital Loan</Link>

      </div>
    </div>

    {/* Govt MSME */}
    <div className="bg-[#f3fbf5] border border-[#d9ebde] shadow-[0_10px_30px_rgba(16,102,42,0.08)] rounded-xl p-4">
      <h3 className="font-bold text-[#10662A] mb-3">
        Government MSME Loans
      </h3>

      <div className="flex flex-col gap-3 text-[14px] text-[#10662A]">

        <Link to="/cgtmse-loan" onClick={() => setMobileOpen(false)}>CGTMSE Loan</Link>

        <Link to="/pmegp-loan" onClick={() => setMobileOpen(false)}>PMEGP Loan</Link>

        <Link to="/standup-india" onClick={() => setMobileOpen(false)}>Stand-Up India</Link>

      </div>
    </div>

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

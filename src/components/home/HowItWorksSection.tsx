import { useState } from "react";
import { useNavigate } from "react-router-dom";

import products from "../../assets/images/products.png";
import check from "../../assets/images/check.png";
import udyam from "../../assets/images/udhyam-2.png";
import disbursal from "../../assets/images/disbursal.png";
import sbi from "../../assets/images/sbi.png";
import axis from "../../assets/images/axis.png";
import psb from "../../assets/images/psb.jpg";
import union from "../../assets/images/union.png";
import baroda from "../../assets/images/bob.png";
import canera from "../../assets/images/canara.png";
import indian from "../../assets/images/indian-bank.png";
import hdfc from "../../assets/images/hdfc.png";
import yes from "../../assets/images/yes.png";
import icici from "../../assets/images/icici.png";
// ================= STATS =================

const partnerLogos = [
  { src: sbi, alt: "SBI" },
  { src: axis, alt: "Axis Bank" },
  { src: psb, alt: "Bajaj Finserv" },
  { src: union, alt: "union" },
  { src: baroda, alt: "bob" },
  { src: indian, alt: "indian" },
  { src: canera, alt: "canera" },
  { src: hdfc, alt: "hdfc" },
  { src: yes, alt: "yes" },
  { src: icici, alt: "icici" },
  
  
  // yahan aur add karte jao
];

// ================= PRODUCT OPTIONS =================
const productOptions = [
  { label: "MSME Loan", path: "/msme-loan" },
  { label: "Mudra Loan", path: "/mudra-loan" },
  { label: "Home Loan", path: "/home-loan" },
  { label: "Loan Against Property", path: "/lap-loan" },
  { label: "Personal Loan", path: "/personal-loan" },
  { label: "Auto Loan", path: "/auto-loan" },
  { label: "Education Loan", path: "/education-loan" },
  { label: "Machinery Loan", path: "/machinery-loan" },
  { label: "Credit Card", path: "/credit-cards" },
];

const HowItWorksSection = () => {
  const navigate = useNavigate();

  const [selectedProduct, setSelectedProduct] = useState<string>("");

  // ===== STEP 2 NAVIGATION : ONLY TO ELIGIBILITY PAGE =====
  const goToEligibility = () => {
    if (!selectedProduct) {
      alert("Please select a product first");
      return;
    }

    // 🔹 IMPORTANT: Absolute route use karo
    navigate("/check-eligibility", {
      state: { product: selectedProduct },
    });
  };

  return (
    <section className="w-full bg-green-50 py-">
      <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-2xl font-bold text-center text-[#10662A] mb-2">
  How RupeeDial Works
</h2>
<p className="text-lg text-center text-[#390A5D] mb-6">
  Check loan eligibility across multiple banks in minutes
</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {/* ===== STEP 1 : CHOOSE PRODUCT ===== */}
          <div className="flex flex-col items-center bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">

           <img
  src={products}
  alt="Choose loan product on RupeeDial platform"
  loading="lazy"
  className="h-18"
/>

            <h3 className="font-semibold text-[#10662A] mt-[-8px]">
              Choose Product
            </h3>
<p className="mt-2 text-sm mb-2 text-[#390A5D]">
              Select the loan or credit <br />product that suits your needs.
            </p>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full max-w-[180px] border border-[#10662A] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]"
            >
              <option value="" disabled>
                Select loan product
              </option>

              {productOptions.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.label}
                </option>
              ))}
            </select>

           
            
          </div>

          {/* ===== STEP 2 : CHECK ELIGIBILITY ===== */}
         <div
  className={`flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all ${
    selectedProduct ? "opacity-100" : "opacity-40 pointer-events-none"
  }`}
>
            <img src={check} className="h-18 mb-4" />

            <h3 className="font-semibold text-[#10662A]">
              Check Eligibility
            </h3>

           <p className="text-sm text-[#390A5D] mb-3">
  {selectedProduct
    ? "Instant eligibility across multiple banks & NBFCs"
    : "Please select a loan product to proceed"}
</p>


            {selectedProduct && (
              <button
                onClick={goToEligibility}
                className="bg-[#10662A] hover:bg-[#0d5221] text-white text-sm px-5 py-2 rounded-md font-semibold"
              >
                Check Now
              </button>
            )}
          </div>

          {/* ===== STEP 3 : UPLOAD DOCUMENTS (INFO ONLY) ===== */}
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg opacity-50 transition-shadow">

            <img src={udyam} className="h-18 mb-4" />

            <h3 className="font-semibold text-[#10662A]">
              Upload Documents
            </h3>

            <p className="text-sm text-[#390A5D] text-center">
              After eligibility, upload your documents.
            </p>
          </div>

          {/* ===== STEP 4 : GET DISBURSAL (INFO ONLY) ===== */}
          <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg opacity-50 transition-shadow">

            <img src={disbursal} className="h-18 mb-4" />

            <h3 className="font-semibold text-[#10662A]">
              Get Disbursal
            </h3>

            <p className="text-sm text-[#390A5D] text-center">
              Final approval & loan disbursal.
            </p>
          </div>
        </div>

        {/* ===== CURRENT SELECTION INFO ===== */}
        <div className="mt-10 text-center">
          {selectedProduct ? (
            <p className="text-[#10662A] font-medium">
              Selected Product:{" "}
              <span className="font-semibold">{selectedProduct}</span>
            </p>
          ) : (
            <p className="text-gray-500">
           
            </p>
          )}
        </div>

      </div>
      <p className="text-sm text-center text-[#390A5D] max-w-4xl mx-auto  mb-3 mt-3">
  RupeeDial is an online loan comparison platform that helps users check eligibility
  for MSME loans, personal loans, home loans, LAP and Mudra loans across multiple
  banks and NBFCs in India.
</p>
       {/* ===== TRUSTED BY STRIP ===== */}
{/* ===== TRUSTED BY STRIP (SINGLE LINE) ===== */}
{/* ===== TRUSTED BY STRIP ===== */}
{/* ===== TRUSTED BY STRIP (AUTO SLIDER) ===== */}
<section className="bg-green-100 py-4 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">

    <div className="relative w-full overflow-hidden">
      <div className="flex animate-marquee gap-12 w-max items-center">

        {/* First full set (Text + Logos) */}
        <p className="text-xl font-bold text-[#10662A] whitespace-nowrap shrink-0">
          Trusted by 50+ Bank & NBFC Partners
        </p>

        {partnerLogos.map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="h-12 object-contain shrink-0"
          />
        ))}

        {/* Duplicate full set for infinite scroll */}
        <p className="text-xl font-bold text-[#10662A] whitespace-nowrap shrink-0">
          Trusted by 50+ Bank & NBFC Partners
        </p>

        {partnerLogos.map((logo, index) => (
          <img
            key={`dup-${index}`}
            src={logo.src}
            alt={logo.alt}
            className="h-10 object-contain shrink-0"
          />
        ))}

      </div>
    </div>

  </div>
</section>



    </section>
     
  );
};

export default HowItWorksSection;

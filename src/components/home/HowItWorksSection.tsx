import { useState } from "react";
import { useNavigate } from "react-router-dom";

import products from "../../assets/images/products.png";
import check from "../../assets/images/check.png";
import udyam from "../../assets/images/udhyam-2.png";
import disbursal from "../../assets/images/disbursal.png";
const stats = [
  { label: "Partner Banks", value: "20+" },
  { label: "Journeys Completed", value: "7.5 lac+" },
  { label: "Loans Disbursed", value: "74,000 cr.+" },
  { label: "Video Testimonials", value: "6,300+" },
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
    <section className="w-full bg-green-50 py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center text-[#390A5D] mb-8">
          Why Rupeedial ?
        </h2>
 <p className="text-2xl  text-center text-[#10662A] mb-8">
          Estimated Loan eligibility. Check Probable Offers. Lowest Interest Rate
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {/* ===== STEP 1 : CHOOSE PRODUCT ===== */}
          <div className="flex flex-col items-center bg-white p-2 rounded-xl shadow-md hover:shadow-lg transition-shadow">

            <img src={products} className="h-18 " />

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
                ? "Instant eligibility across banks."
                : "Select product first"}
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
      <section className="w-full bg-[#0D5221] py-2">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 px-2">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <h2 className="text-[20px] text-[#ffffff] font-bold">
                {s.value}
              </h2>
              <p className="mt-1 text-[16px] text-[#fff]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
     
  );
};

export default HowItWorksSection;

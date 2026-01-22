import { Link } from "react-router-dom";

import campare from "../../assets/images/campare.png";
import sbi from "../../assets/images/sbi.png";
import axis from "../../assets/images/axis.png";
import bajaj from "../../assets/images/bajaj.jpg";

// ================= STATS =================


const HomeTopSection = () => {
  return (
    <>
   {/* ===== HERO SECTION (FULL WIDTH GRADIENT) ===== */}
<section className="bg-gradient-to-b from-white to-green-50  ">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    {/* LEFT CONTENT */}
    <div>
      <h1 className="text-4xl md:text-4xl font-bold text-[#390A5D] leading-tight">
        Compare Loans Easily from –{" "}
        <span className="text-[#10662A]">Leading Banks & NBFCs</span>
      </h1>

      <p className="mt-5 text-lg text-[#390A5D]">
        Instant eligibility check • Expert assistance • Pan-India partner network
      </p>

      <div className="mt-2 flex gap-4 flex-wrap">
         <Link
          to="/expert"
          className="bg-[#10662A] hover:bg-[#0d5221] text-white px-8 py-3 rounded-lg font-semibold shadow"
        >
          Talk to Expert
        </Link>

        <Link
          to="/check-eligibility"
          className="border border-[#10662A] text-[#10662A] hover:bg-[#F5FFF8] px-8 py-3 rounded-lg font-semibold"
        >
          Check Eligibility
        </Link>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center">
      <img
        src={campare}
        alt="RupeeDial Platform"
        className="w-full  max-w-md"
      />
    </div>
  </div>
</section>


     {/* ===== TRUSTED BY STRIP ===== */}
{/* ===== TRUSTED BY STRIP (SINGLE LINE) ===== */}
{/* ===== TRUSTED BY STRIP ===== */}
<section className="bg-green-100">
  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-wrap items-center justify-center gap-8">

      <p className="text-xl md:text-xl font-bold text-[#10662A] whitespace-nowrap">
        Trusted by 50+ Bank & NBFC Partners
      </p>

      <img src={sbi} alt="SBI" className="h-10 object-contain" />
      <img src={axis} alt="Axis Bank" className="h-10 object-contain" />
      <img src={bajaj} alt="Bajaj Finserv" className="h-10 object-contain" />

      {/* aur logos yahin add kar sakte ho */}
    </div>
  </div>
</section>



    </>
  );
};

export default HomeTopSection;

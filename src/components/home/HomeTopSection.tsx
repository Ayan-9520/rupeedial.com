import { Link } from "react-router-dom";
import campare from "../../assets/images/campare.png";

const HomeTopSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-4xl font-bold text-[#390A5D] leading-tight">
 Compare & Apply Loans in India
  <br />
  <span className="text-[#10662A]">
   MSME, Personal & Home Loans with Expert Support
  </span>
</h1>

         <p className="mt-4 text-lg text-[#390A5D]">
  No advance fees • RBI-guided partners • 100% transparent process
</p>

          {/* TRUST STRIP */}
          <div className="mt-4 flex gap-3 flex-wrap text-sm">
            <span className="bg-white px-3 py-1 rounded shadow">🔒 100% Secure</span>
            <span className="bg-white px-3 py-1 rounded shadow">📞 Expert Call</span>
            <span className="bg-white px-3 py-1 rounded shadow">🇮🇳 Pan-India</span>
          </div>

          {/* CTA */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <Link
              to="/check-eligibility"
              className="bg-[#10662A] hover:bg-[#0d5221] text-white px-8 py-3 rounded-lg font-semibold shadow"
            >
              Check Eligibility Free
            </Link>

            <Link
              to="/expert"
              className="border border-[#10662A] text-[#10662A] px-8 py-3 rounded-lg font-semibold"
            >
              Talk to Expert
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
         <img
  src={campare}
  alt="Compare loans across multiple banks in India with RupeeDial"
  title="Loan Comparison Platform India – RupeeDial"
  loading="lazy"
  width="420"
  height="360"
  className="w-full max-w-md"
/>
        </div>
      </div>
    </section>
  );
};

export default HomeTopSection;
